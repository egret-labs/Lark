module ts {
    var checker: TypeChecker = null;

    //parse
    var classNameToFileMap: Map<string> = {};
    var classNames: Map<number> = {};
    var fileToClassNameMap: Map<string[]> = {};
    var classNameToBaseClassMap: Map<string[]> = {};
    var constructorToClassMap: Map<string[]> = {};
    var staticToClassNameMap: Map<string> = {};

    //sort
    var fileNodesList: FileNode[] = [];
    var fileNameToNodeMap: Map<FileNode> = {};
    var orderedFileList: string[] = [];



    export class TreeGenerator {

        static getOrderedFiles() {
            return orderedFileList;
        }

        classNameToFileMap = classNameToFileMap;
        public orderFiles(chk: TypeChecker, program: Program) {

            classNameToFileMap = {};
            fileToClassNameMap = {};
            classNameToBaseClassMap = {};
            constructorToClassMap = {};
            staticToClassNameMap = {};

            fileNodesList = [];
            fileNameToNodeMap = {};

            var files = program.getSourceFiles().concat();
            var libdts = files.shift();
            orderedFileList = files.map(f=> f.filename);
            checker = chk;
            forEach(files, file=> this.symbolTabelToFileMap(file, file.locals));
            this.sortFiles();
            var sources = program.getSourceFiles();
            orderedFileList.forEach(f=> {
                for (var i = 0; i < sources.length; i++) {
                    var s = sources[i];
                    if (s.filename == f) {
                        sources.splice(i, 1);
                        sources.push(s);
                        break;
                    }
                }
            });
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
                this.constructorToClassName(file, <ClassDeclaration>symbol.valueDeclaration);
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

        private constructorToClassName(file: SourceFile, classNode: ClassDeclaration) {
            if (!classNode || !classNode.symbol)
                return;
            var className = checker.getFullyQualifiedName(classNode.symbol);
            var nodesToCheck: Node[] = [];
            forEachChild(classNode, node=> {
                if (node.kind == SyntaxKind.Constructor) {
                    nodesToCheck.push((<ConstructorDeclaration>node).body);
                }

                if (node.kind == SyntaxKind.Property && (<PropertyDeclaration>node).initializer) {
                    nodesToCheck.push((<PropertyDeclaration>node).initializer);
                }
            });
            if (!nodesToCheck.length) {
                return;
            }
            
            var findUsedClasses: (node: Node) => void;
            findUsedClasses = node=> forEachChild(node, n=> {
                var nodeToGet: Node = null;
                switch (n.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                        nodeToGet = (<PropertyAccessExpression>n).expression;
                        break;
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                        nodeToGet = (<CallExpression>n).expression;
                        break;
                    default:
                        nodeToGet = null;
                }

                if (nodeToGet) {
                    var definedSymbol = checker.egretGetResolveSymbol(<Identifier>nodeToGet);

                    if (definedSymbol && (definedSymbol.flags & SymbolFlags.Value || definedSymbol.flags & SymbolFlags.Export)) {
                        var name = checker.getFullyQualifiedName(definedSymbol);
                        if (name == "unknown")
                            return;
                        var classes = constructorToClassMap[className] || [];
                        classes.push(name);
                        constructorToClassMap[className] = classes;
                        if (!(name in classNameToFileMap) && definedSymbol.declarations && definedSymbol.declarations.length) {
                            var source = <SourceFile>getAncestor(definedSymbol.declarations[0], SyntaxKind.SourceFile);
                            classNameToFileMap[name] = source.filename;
                        }
                    }
                }
                else {
                    findUsedClasses(n);
                }
            });

            nodesToCheck.forEach(node=> findUsedClasses(node));
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

        private addStaticDepend(staticMemberName: string, className: string) {

        }

        private classNameToBaseClass(className, baseType:InterfaceType) {
            var fullName = checker.getFullyQualifiedName(baseType.symbol);
            var bases = classNameToBaseClassMap[className] || [];
            if(bases.indexOf(fullName)<0)
                bases.push(fullName);
            classNameToBaseClassMap[className] = bases;
        }






        private getFileNode(file:string) {
            if (file in fileNameToNodeMap)
                return fileNameToNodeMap[file];
            var typeNode = new FileNode();
            typeNode.name = file;
            typeNode.subs = [];
            typeNode.depends = [];
            typeNode.supers = [];
            typeNode.subdepends = [];

            fileNodesList.push(typeNode);
            fileNameToNodeMap[file] = typeNode;

            return typeNode;
        }

        private sortFiles() {
            forEachKey(classNameToFileMap, className=> {
                var file = classNameToFileMap[className];
                var fileNode = this.getFileNode(file);
                var supers = classNameToBaseClassMap[className];
                if (supers) {
                    supers.forEach(superClass=> {
                        var dependFile = classNameToFileMap[superClass];
                        if (dependFile == file)
                            return;
                        var dependNode = this.getFileNode(dependFile);
                        dependNode.addSub(fileNode);
                        fileNode.addSuper(dependNode);
                    })
                }
                var staticDepends = staticToClassNameMap[className];
                if (staticDepends) {
                    var constructorDepends = constructorToClassMap[staticDepends] || [];
                    constructorDepends.push(staticDepends);
                    constructorDepends.forEach(depend=> {
                        var dependFile = classNameToFileMap[depend];

                        if (dependFile != file) {
                            var dependFileNode = this.getFileNode(dependFile);
                            fileNode.addDepends(dependFileNode);
                            dependFileNode.addSubDepends(fileNode);
                        }
                    });
                }
            });

            var singleTypes: FileNode[] = [],
                bottomTypes: FileNode[] = [],
                topTypes: FileNode[] = [],
                otherTypes: FileNode[] = [];

            fileNodesList.forEach(t=> {
                if ((t.subs.length || t.supers.length || t.depends.length||t.subdepends.length) == 0)
                    singleTypes.push(t);
                else if (t.subs.length == 0&&t.subdepends.length==0)
                    bottomTypes.push(t);
                else if (t.supers.length == 0 && t.depends.length == 0)
                    topTypes.push(t);
                else
                    otherTypes.push(t);
            });

            topTypes.forEach(t=> t.setOrder(0));
            bottomTypes.forEach(t=> t.setOrder(t.order));
            fileNodesList.sort((a, b) => compareFileNode(a, b));
            orderedFileList = fileNodesList.map(f=> f.name);
        }

    }

    var fileToFileMap: Map<Map<boolean>> = {};

    export class UsedFileResolver{
        
        static mapFile(source: string, used: string) {
            var depends = fileToFileMap[source];
            if (!depends)
            {
                depends = {};
                fileToFileMap[source] = depends;
            }
            depends[used] = true;
        }

    }



    function compareFileNode(a: FileNode, b: FileNode) {
        if (a.order != b.order)
            return a.order - b.order;

        if (a.subs.length == 0 && a.subdepends.length == 0)
            return -1;

        if (b.subs.length == 0 && b.subdepends.length == 0)
            return 1;

        return 0;

    }


    /**
    * no export properties may have same name, add id after the name
    */
    function getFullyQualifiedName(symbol: Symbol) {
        var name:string = null;
        if (symbol.exportSymbol)
        {
            name = checker.getFullyQualifiedName(symbol.exportSymbol);
            classNames[name] = Object.keys(classNames).length;
        }
        else
        {
            name = checker.getFullyQualifiedName(symbol);
            if (!(symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.Module)))
            {
                name += symbol.id;
            }
            else
            {
                classNames[name] = Object.keys(classNames).length;
            }
        }
            
        return name;

    }

    class FileNode {
        name: string;
        supers: FileNode[];
        subs: FileNode[];
        depends: FileNode[];
        subdepends: FileNode[];
        file: string;

        addSuper(node: FileNode) {
            if (this.supers.indexOf(node) >= 0)
                return;
            this.supers.push(node);
        }

        addDepends(node: FileNode) {
            if (this.depends.indexOf(node) >= 0)
                return;
            this.depends.push(node);
        }


        addSub(node: FileNode) {
            if (this.subs.indexOf(node) >= 0)
                return;
            this.subs.push(node);
        }

        addSubDepends(node: FileNode) {
            if (this.subdepends.indexOf(node) >= 0)
                return;
            this.subdepends.push(node);
        }

        _order: number = 0;
        

        setOrder(value: number,nest:number = 0) {
            this.depends.concat(this.supers).forEach(s=> {
                if (s.order > value)
                    value = s.order + 1;
            })

            var offset = value - this._order;
            this._order = value;

            this.subdepends.concat(this.subs).forEach(s=> {
                if (s._order <= this._order)
                    s.setOrder( this._order + 1,nest+1);
                s.setOrder(s._order + offset, nest + 1);
            });
        }

        get order(): number {
            return this._order;;
        }
    }
}
