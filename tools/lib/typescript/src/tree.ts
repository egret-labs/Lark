module ts {
    var checker: TypeChecker = null;

    //parse
    var classNameToFileMap: Map<string> = {};
    var interfaceNames: Map<boolean> = {};
    var fileToClassNameMap: Map<string[]> = {};
    var classNameToBaseClassMap: Map<string[]> = {};
    var staticToClassNameMap: Map<string> = {};
    var fileToClassOrderMap: Map<number[]> = {};

    //sort
    var typeNodesList: TypeNode[] = [];
    var classNameToNodeMap: Map<TypeNode> = {};
    var orderedFileList: string[] = [];



    export class TreeGenerator {
        classNameToFileMap = classNameToFileMap;
        public orderFiles(chk: TypeChecker, program: Program) {

            classNameToFileMap = {};
            interfaceNames = {};
            fileToClassNameMap = {};
            classNameToBaseClassMap = {};
            staticToClassNameMap = {};

            typeNodesList = [];
            classNameToNodeMap = {};

            var files = program.getSourceFiles().concat();
            var libdts = files.shift();
            files = files.splice(1);
            orderedFileList = files.map(f=> f.filename);
            checker = chk;
            forEach(files, file=> this.symbolTabelToFileMap(file, file.locals));
            this.sortFiles();

            var sources = program.getSourceFiles();
            //sources.length = 0;

            var lostFiles = [];

            sources.forEach(s=> {
                if (orderedFileList.indexOf(s.filename) < 0)
                    lostFiles.push(s);
            })

            orderedFileList.forEach(f=> {
                var index = -1;
                var source: ts.SourceFile = null;
                files.some((s,i)=> {
                    if (s.filename == f) {
                        source = s;
                        index = i;
                        return true;
                    }
                    return false;
                });
                if (index >= 0) {
                    sources.splice(index, 1);
                    sources.push(source);
                }
            });
            sources.unshift(libdts);
        }

        private symbolToFileMap(file: SourceFile, symbol:Symbol) {
            var classtype = <InterfaceType>checker.getDeclaredTypeOfSymbol(symbol.exportSymbol || symbol);
            if (symbol.flags & (SymbolFlags.Module))
                return;

            var isInterface = symbol.flags & SymbolFlags.Interface;
            if (classtype) {
                
                var fullName = getFullyQualifiedName( symbol);
                classNameToFileMap[fullName] = file.filename;


                var classes = fileToClassNameMap[file.filename];
                if (!classes) {
                    classes = [];
                    fileToClassNameMap[file.filename] = classes;
                }
                if (classes.indexOf(fullName) < 0)
                    classes.push(fullName);
                if (isInterface)
                    return;
                if (classtype.baseTypes && classtype.baseTypes.length) {
                    forEach(classtype.baseTypes,(t: InterfaceType) => this.classNameToBaseClass(fullName, t));
                }
            }
            

        }
        private symbolTabelToFileMap(file: SourceFile, symbolTable: SymbolTable) {

            ts.forEachValue(symbolTable, symbol=> {
                symbol = symbol.exportSymbol || symbol;
                if (symbol.name == "prototype")
                    return;
                this.symbolToFileMap(file, symbol);
                this.staticMemberToClassName(file, symbol);
                if (symbol.valueDeclaration && symbol.valueDeclaration.locals) {
                    this.symbolTabelToFileMap(file, symbol.valueDeclaration.locals);
                }
                if (symbol.exports) {
                    this.symbolTabelToFileMap(file, symbol.exports);
                }
            });
        }

        private staticMemberToClassName(file: SourceFile, symbol: Symbol) {
            symbol = symbol.exportSymbol || symbol;
            var fullName = getFullyQualifiedName(symbol);
            var declarExp = <PropertyDeclaration>symbol.valueDeclaration;
            if (declarExp && declarExp.initializer) {
                var staticMemberType = checker.checkAndMarkExpression(declarExp.initializer);
                if (staticMemberType.symbol == undefined || (staticMemberType.symbol.flags & SymbolFlags.Interface))
                    return;
                var initializerClass = checker.getFullyQualifiedName(staticMemberType.symbol);
                staticToClassNameMap[fullName] = initializerClass;
                
            }
        }

        private classNameToBaseClass(className, baseType:InterfaceType) {
            var fullName = checker.getFullyQualifiedName(baseType.symbol);
            var bases = classNameToBaseClassMap[className] || [];
            if(bases.indexOf(fullName)<0)
                bases.push(fullName);
            classNameToBaseClassMap[className] = bases;
        }






        private getClassNode(className:string) {
            if (className in classNameToNodeMap)
                return classNameToNodeMap[className];
            var typeNode = new TypeNode();
            typeNode.name = className;
            //typeNode.file = classNameToFileMap[className];
            typeNode.subClass = [];
            typeNode.depends = [];
            typeNode.supers = [];
            typeNode.subdepends = [];

            typeNodesList.push(typeNode);
            classNameToNodeMap[className] = typeNode;

            return typeNode;
        }

        private sortFiles() {
            forEachKey(classNameToFileMap, className=> {
                var file = classNameToFileMap[className];
                //var typeNode = this.getClassNode(className);
                var fileNode = this.getClassNode(file);
                var supers = classNameToBaseClassMap[className];
                if (supers) {
                    supers.forEach(superClass=> {
                        //var superNode = this.getClassNode(superClass);
                        //superNode.subClass.push(typeNode);
                        //typeNode.supers.push(superNode);
                        var dependFile = classNameToFileMap[superClass];
                        if (dependFile == file)
                            return;
                        var dependNode = this.getClassNode(dependFile);
                        dependNode.addSub(fileNode);
                        fileNode.addSuper(dependNode);
                    })
                }
                var staticDepends = staticToClassNameMap[className];
                if (staticDepends) {
                    //var dependNode = this.getClassNode(staticDepends);
                    //typeNode.depends.push(dependNode);
                    //dependNode.subdepends.push(typeNode);

                    var dependFile = classNameToFileMap[staticDepends];
                    if (dependFile != file) {
                        var dependFileNode = this.getClassNode(dependFile);
                        fileNode.addDepends(dependFileNode);
                        dependFileNode.addSubDepends(fileNode);
                    }
                }
            });

            var singleTypes: TypeNode[] = [],
                bottomTypes: TypeNode[] = [],
                topTypes: TypeNode[] = [],
                otherTypes: TypeNode[] = [];

            typeNodesList.forEach(t=> {
                if ((t.subClass.length || t.supers.length || t.depends.length||t.subdepends.length) == 0)
                    singleTypes.push(t);
                else if (t.subClass.length == 0&&t.subdepends.length==0)
                    bottomTypes.push(t);
                else if (t.supers.length == 0 && t.depends.length == 0)
                    topTypes.push(t);
                else
                    otherTypes.push(t);
            });

            topTypes.forEach(t=> t.setOrder(0));
            bottomTypes.forEach(t=> t.setOrder(t.order));
            //orderedFileList.forEach(f=> {
            //    var classes = fileToClassNameMap[f];
            //    var classOrders = [];
            //    classes.forEach(c=> {
            //        var order = classNameToNodeMap[c].order;
            //        if (classOrders.indexOf(order) < 0)
            //            classOrders.push(order);
            //    });
            //    classOrders.sort();
            //    classOrders.reverse();
            //    fileToClassOrderMap[f] = classOrders;
            //});
            //orderedFileList.sort(compareFile);

            

            typeNodesList.sort((a, b) => compareType(a, b));
            //typeNodesList.reverse();
            //typeNodesList.forEach(n=> {
            //    var file = classNameToFileMap[n.name];
            //    if (!file)
            //        return;
            //    var index = orderedFileList.indexOf(file);
            //    if (index < 0)
            //        orderedFileList.push(file);
            //    else if(n.hasSubClassOrDepends) {
            //        orderedFileList.splice(index, 1);
            //        orderedFileList.push(file);
            //    }
            //});
            orderedFileList = typeNodesList.map(f=> f.name);
        }
    }




    function compareType(a: TypeNode, b: TypeNode) {
        if (a.order != b.order)
            return a.order - b.order;
        //if (aisDependOnB(a, b))
        //    return 1;
        //if (aisDependOnB(b, a))
        //    return -1;

        if (a.subClass.length == 0 && a.subdepends.length == 0)
            return -1;

        if (b.subClass.length == 0 && b.subdepends.length == 0)
            return 1;

        

        return 0;

    }


    /**
    * no export properties may have same name, add id after the name
    */
    function getFullyQualifiedName(symbol: Symbol) {
        if (symbol.exportSymbol)
            return checker.getFullyQualifiedName(symbol.exportSymbol);


        var name = checker.getFullyQualifiedName(symbol);
        if (!(symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Module))) {
            name += symbol.id;
        }
        return name;

    }

    class TypeNode {
        name: string;
        supers: TypeNode[];
        subClass: TypeNode[];
        depends: TypeNode[];
        subdepends: TypeNode[];
        file: string;

        addSuper(node: TypeNode) {
            if (this.supers.indexOf(node) >= 0)
                return;
            this.supers.push(node);
        }

        addDepends(node: TypeNode) {
            if (this.depends.indexOf(node) >= 0)
                return;
            this.depends.push(node);
        }


        addSub(node: TypeNode) {
            if (this.subClass.indexOf(node) >= 0)
                return;
            this.subClass.push(node);
        }

        addSubDepends(node: TypeNode) {
            if (this.subdepends.indexOf(node) >= 0)
                return;
            this.subdepends.push(node);
        }

        _order: number = 0;
        

        setOrder(value: number,nest:number = 0) {



            this.depends.forEach(s=> {
                if (s.order > value)
                    value = s.order + 1;
            })
            this.supers.forEach(s=> {
                if (s.order > value)
                    value = s.order + 1;
            })

            var offset = value - this._order;
            this._order = value;
            this.subdepends.forEach(s=> {
                if (s._order <= this._order)
                    s.setOrder( this._order + 1,nest+1);
                
                s.setOrder(s._order + offset, nest + 1);
            });
            this.subClass.forEach(s=> {
                if (s._order <= this._order)
                    s.setOrder(this._order + 1, nest + 1);
                s.setOrder(s._order + offset, nest + 1);
            });
        }

        get order(): number {
            return this._order;;
        }

        get hasSubClassOrDepends() {
            return this.subClass.length > 0 || this.subdepends.length > 0;
        }
    }
}