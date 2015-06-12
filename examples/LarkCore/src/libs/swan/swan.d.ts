declare module swan {
    /**
     * 列表类组件的项呈示器接口
     */
    interface IItemRenderer extends UIComponent {
        /**
         * 要呈示或编辑的数据。
         */
        data: any;
        /**
         * 如果项呈示器可以将其自身显示为已选中，则为 true。
         */
        selected: boolean;
        /**
         * 项呈示器的数据提供程序中的项目索引。
         */
        itemIndex: number;
    }
}
declare module swan {
    /**
     * ColumnAlign 类为 TileLayout 类的 columnAlign 属性定义可能的值。
     */
    class ColumnAlign {
        /**
         * 不将行两端对齐。
         */
        static LEFT: string;
        /**
         * 通过增大水平间隙将行两端对齐。
         */
        static JUSTIFY_USING_GAP: string;
        /**
         * 通过增大行高度将行两端对齐。
         */
        static JUSTIFY_USING_WIDTH: string;
    }
}
declare module swan.sys {
    /**
     * 代码生成工具基类
     */
    class CodeBase {
        toCode(): string;
        indent: number;
        /**
         * 获取缩进字符串
         */
        getIndent(indent?: number): string;
    }
    class EXClass extends CodeBase {
        /**
         * 构造函数代码块
         */
        constructCode: EXCodeBlock;
        /**
         * 类名,不包括模块名
         */
        className: string;
        /**
         * 父类类名,包括完整模块名
         */
        superClass: string;
        /**
         * 内部类区块
         */
        private innerClassBlock;
        /**
         * 添加一个内部类
         */
        addInnerClass(clazz: EXClass): void;
        /**
         * 变量定义区块
         */
        private variableBlock;
        /**
         * 添加变量
         */
        addVariable(variableItem: EXVariable): void;
        /**
         * 根据变量名获取变量定义
         */
        getVariableByName(name: string): EXVariable;
        /**
         * 函数定义区块
         */
        private functionBlock;
        /**
         * 添加函数
         */
        addFunction(functionItem: EXFunction): void;
        /**
         * 根据函数名返回函数定义块
         */
        getFuncByName(name: string): EXFunction;
        toCode(): string;
    }
    class EXCodeBlock extends CodeBase {
        /**
         * 添加变量声明语句
         * @param name 变量名
         * @param value 变量初始值
         */
        addVar(name: string, value?: string): void;
        /**
         * 添加赋值语句
         * @param target 要赋值的目标
         * @param value 值
         * @param prop 目标的属性(用“.”访问)，不填则是对目标赋值
         */
        addAssignment(target: string, value: string, prop?: string): void;
        /**
         * 添加返回值语句
         */
        addReturn(data: string): void;
        /**
         * 添加一条空行
         */
        addEmptyLine(): void;
        /**
         * 开始添加if语句块,自动调用startBlock();
         */
        startIf(expression: string): void;
        /**
         * 开始else语句块,自动调用startBlock();
         */
        startElse(): void;
        /**
         * 开始else if语句块,自动调用startBlock();
         */
        startElseIf(expression: string): void;
        /**
         * 添加一个左大括号，开始新的语句块
         */
        startBlock(): void;
        /**
         * 添加一个右大括号,结束当前的语句块
         */
        endBlock(): void;
        /**
         * 添加执行函数语句块
         * @param functionName 要执行的函数名称
         * @param args 函数参数列表
         */
        doFunction(functionName: string, args: string[]): void;
        private lines;
        /**
         * 添加一行代码
         */
        addCodeLine(code: string): void;
        /**
         * 添加一行代码到指定行
         */
        addCodeLineAt(code: string, index: number): void;
        /**
         * 是否存在某行代码内容
         */
        containsCodeLine(code: string): boolean;
        /**
         * 在结尾追加另一个代码块的内容
         */
        concat(cb: EXCodeBlock): void;
        toCode(): string;
    }
    class EXFunction extends CodeBase {
        /**
         * 代码块
         */
        codeBlock: EXCodeBlock;
        isGet: boolean;
        /**
         * 函数名
         */
        name: string;
        toCode(): string;
    }
    class EXVariable extends CodeBase {
        constructor(name: string, defaultValue?: string);
        /**
         * 变量名
         */
        name: string;
        /**
         * 默认值
         */
        defaultValue: string;
        toCode(): string;
    }
    class EXState extends CodeBase {
        constructor(name: string, stateGroups?: Array<any>);
        /**
         * 视图状态名称
         */
        name: string;
        stateGroups: Array<any>;
        addItems: Array<any>;
        setProperty: Array<any>;
        /**
         * 添加一个覆盖
         */
        addOverride(item: CodeBase): void;
        toCode(): string;
    }
    class EXAddItems extends CodeBase {
        constructor(target: string, property: string, position: number, relativeTo: string);
        /**
         * 要添加的实例
         */
        target: string;
        /**
         * 要添加到的属性
         */
        property: string;
        /**
         * 添加的位置
         */
        position: number;
        /**
         * 相对的显示元素
         */
        relativeTo: string;
        toCode(): string;
    }
    class EXSetProperty extends CodeBase {
        constructor(target: string, name: string, value: string);
        /**
         * 要修改的属性名
         */
        name: string;
        /**
         * 目标实例名
         */
        target: string;
        /**
         * 属性值
         */
        value: string;
        toCode(): string;
    }
    class EXBinding extends CodeBase {
        constructor(target: string, property: string, expression: string);
        /**
         * 目标实例名
         */
        target: string;
        /**
         * 目标属性名
         */
        property: string;
        /**
         * 绑定表达式
         */
        expression: string;
        toCode(): string;
    }
}
declare module swan {
    /**
     * 定义  CollectionEvent 类 kind 属性的有效值的常量。
     * 这些常量指示对集合进行的更改类型。
     */
    class CollectionEventKind {
        /**
         * 指示集合添加了一个或多个项目。
         */
        static ADD: string;
        /**
         * 指示集合应用了排序或/和筛选。
         */
        static REFRESH: string;
        /**
         * 指示集合删除了一个或多个项目。
         */
        static REMOVE: string;
        /**
         * 指示已替换由 CollectionEvent.location 属性确定的位置处的项目。
         */
        static REPLACE: string;
        /**
         * 指示集合已彻底更改，需要进行重置。
         */
        static RESET: string;
        /**
         * 指示集合中一个或多个项目进行了更新。受影响的项目将存储在  CollectionEvent.items 属性中。
         */
        static UPDATE: string;
        /**
         * 指示集合中某个节点的子项列表已打开，通常应用于Tree的数据源XMLCollection。
         */
        static OPEN: string;
        /**
         * 指示集合中某个节点的子项列表已关闭，通常应用于Tree的数据源XMLCollection。
         */
        static CLOSE: string;
    }
}
declare module swan {
    /**
     * 滚动条显示策略常量
     */
    class ScrollPolicy {
        /**
         * 如果子项超出父级的尺寸，则允许滚动，反之不允许滚动。
         */
        static AUTO: string;
        /**
         * 从不允许滚动。
         */
        static OFF: string;
        /**
         * 总是允许滚动。
         */
        static ON: string;
    }
}
declare module swan {
    /**
     * JustifyAlign 定义布局类中 horizontalAlign 与 verticalAlign 属性需要的两端对齐常量值。
     */
    class JustifyAlign {
        /**
         * 两端对齐，使用容器的尺寸作为对齐尺寸。
         */
        static JUSTIFY: string;
        /**
         * 相对于容器对子项进行内容对齐。与 JUSTIFY 不同，CONTENT_JUSTIFY 使用最大子项的尺寸与容器尺寸的两者中的较大值作为对齐尺寸。
         */
        static CONTENT_JUSTIFY: string;
    }
}
declare module swan {
    /**
     * IOverride 接口定义视图状态的覆盖操作。State 类 overrides 属性数组中的所有条目均必须实现此接口。
     */
    interface IOverride {
        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        apply(host: any, parent: lark.DisplayObjectContainer): void;
        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        remove(host: any, parent: lark.DisplayObjectContainer): void;
    }
}
declare module swan {
    /**
     * 简单文本显示控件接口。
     */
    interface IDisplayText {
        /**
         * 此文本组件所显示的文本。
         */
        text: string;
    }
}
declare module swan {
    /**
     * 素材适配器接口。
     * 若项目需要自定义 Image.source的解析规则，需要实现这个接口，
     * 然后调用如下代码注入自定义实现到框架即可：
     * var assetAdapter = new YourAssetAdapter();
     * Stage.registerImplementation("swan.IAssetAdapter",assetAdapter)
     */
    interface IAssetAdapter {
        /**
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param callBack 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的this引用
         */
        getAsset(source: string, callBack: (content: any, source: string) => void, thisObject: any): void;
    }
}
declare module swan {
    /**
     * BitmapFillMode 类定义 Image 控件的图像填充方式。
     * BitmapFillMode 类定义了调整大小模式的一个枚举，这些模式确定 Bitmap 如何填充由布局系统指定的尺寸。
     */
    class BitmapFillMode {
        /**
         * 在区域的边缘处截断不显示位图。
         */
        static CLIP: string;
        /**
         * 重复位图以填充区域。
         */
        static REPEAT: string;
        /**
         * 拉伸位图以填充区域。
         */
        static SCALE: string;
    }
}
declare module swan {
    /**
     * @language en_US
     * An <code>ICollectionView</code> is a view onto a collection of data.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     *
     * <code>ICollection</code>是一个列表的集合类数据源对象的查看接口。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    interface ICollection extends lark.IEventEmitter {
        /**
         * @language en_US
         * [read-only] The number of items in this view.
         * 0 means no items, while -1 means that the length is unknown.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [只读] 此集合中的项目数。0 表示不包含项目。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        length: number;
        /**
         * @language en_US
         * Gets the item at the specified index.
         * @param index The index in the list from which to retrieve the item.
         * @return The item at that index, or <code>null</code> if there is none.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取指定索引处的项目。
         * @param index 要得到的项的指定位置。
         * @return 在索引位置的项，如果没有该项则返回null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        getItemAt(index: number): any;
        /**
         * @language en_US
         * Returns the index of the item if it is in the list。-1 otherwise.
         * @param item The item to find.
         * @return The index of the item, or -1 if the item is not in the list.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果项目位于列表中,返回该项目的索引。否则返回-1。
         * @param item 要查找的项。
         * @return 项的索引，如果该项没有在列表中将返回-1.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        getItemIndex(item: any): number;
    }
}
declare module swan {
    /**
     * RowAlign 类为 TileLayout 类的 rowAlign 属性定义可能的值。
     */
    class RowAlign {
        /**
         * 不进行两端对齐。
         */
        static TOP: string;
        /**
         * 通过增大垂直间隙将行两端对齐。
         */
        static JUSTIFY_USING_GAP: string;
        /**
         * 通过增大行高度将行两端对齐。
         */
        static JUSTIFY_USING_HEIGHT: string;
    }
}
declare module swan {
    /**
     * 定义进度条等控件增长方向的常量
     */
    class Direction {
        /**
         * 水平从左到右增长
         */
        static LTR: string;
        /**
         * 水平从右到左增长
         */
        static RTL: string;
        /**
         * 竖直从上到下增长
         */
        static TTB: string;
        /**
         * 竖直从下到上增长
         */
        static BTT: string;
    }
}
declare module swan {
    /**
     * TileOrientation 类为 TileLayout 类的 orientation 属性定义可能的值。
     */
    class TileOrientation {
        /**
         * 逐行排列元素。
         */
        static ROWS: string;
        /**
         * 逐列排列元素。
         */
        static COLUMNS: string;
    }
}
declare module swan.sys {
}
declare module swan {
    /**
     * 支持视区的组件接口
     */
    interface IViewport extends UIComponent {
        /**
         * 视域的内容的宽度。
         * 如果 clipAndEnabledScrolling 为 true， 则视域的 contentWidth 为水平滚动定义限制，
         * 且视域的实际宽度定义可见的内容量。要在内容中水平滚动， 请在 0 和 contentWidth - width
         * 之间更改 scrollH。
         */
        contentWidth: number;
        /**
         * 视域的内容的高度。
         * 如果 scrollEnabled 为 true，则视域的 contentHeight 为垂直滚动定义限制，
         * 且视域的实际高度定义可见的内容量。要在内容中垂直滚动，请在 0 和 contentHeight - height
         * 之间更改 scrollV。
         */
        contentHeight: number;
        /**
         * 可视区域水平方向起始点
         */
        scrollH: number;
        /**
         * 可视区域竖直方向起始点
         */
        scrollV: number;
        /**
         * 如果为 true，指定将子代剪切到视区的边界。如果为 false，则容器子代会从容器边界扩展过去，而不管组件的大小规范。默认false
         */
        scrollEnabled: boolean;
    }
}
declare module swan.sys {
    /**
     * Swan 命名空间
     */
    var NS_S: string;
    /**
     * Wing命名空间
     */
    var NS_W: string;
    class EXMLConfig {
        private properties;
        private describe(instance);
        /**
         * 根据类的短名ID和命名空间获取完整类名(以"."分隔)
         * @param id 类的短名ID
         * @param ns 命名空间
         */
        getClassNameById(id: string, ns: string): string;
        /**
         * 根据ID获取对应的默认属性
         * @param id 类的短名ID
         * @param ns 命名空间
         * @return 默认属性名
         */
        getDefaultPropById(id: string, ns: string): string;
        /**
         * 获取指定属性的类型,返回基本数据类型："boolean","string","number","any"。
         * @param property 属性名
         * @param className 要查询的完整类名
         */
        getPropertyType(property: string, className: string): string;
    }
}
declare module swan {
    /**
     * @language en_US
     * Default instance of interface <code>IAssetAdapter</code>.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 默认的IAssetAdapter接口实现。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class DefaultAssetAdapter implements IAssetAdapter {
        /**
         * @language en_US
         * resolve asset.
         * @param source the identifier of new asset need to be resolved
         * @param callBack callback function when resolving complete
         * example：callBack(content:any,source:string):void;
         * @param thisObject <code>this</code> object of callback method
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 解析素材
         * @param source 待解析的新素材标识符
         * @param callBack 解析完成回调函数，示例：callBack(content:any,source:string):void;
         * @param thisObject callBack的 this 引用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        getAsset(source: string, callBack: (data: any, source: string) => void, thisObject: any): void;
        /**
         * @private
         *
         * @param event
         */
        private onLoadFinish(event);
    }
}
declare module swan {
    /**
     * 标记实例的一个属性是可绑定的,此方法通常由 Watcher 类调用。
     * @param instance 要标记的实例
     * @param property 可绑定的属性。
     */
    function registerBindable(instance: any, property: string): void;
}
declare module swan {
    /**
     * 为一个类定义注册运行时属性类型，以便运行时的EXML文件解析过程能获取准确的属性类型。大多数情况下，您都不需要手动调用此方法显式注册属性类型。
     * 仅当您有一个自定义的 UI 组件，需要在EXML中用标签描述时可能需要显式注册，但以下情况除外：
     * 当属性类型为基本数据类型：boolean,number,string,Array这四种其中之一时，您只需要为自定义的属性赋值上正确的初始值，
     * 运行时EXML解析器就能通过初始值自动分析出正确的属性类型。
     * 若您无法为属性赋值上正确的初始值时(有初始值，比如null),运行时EXML解析器会把此属性当做string来处理，若完全没有初始值，将会报错找不到节点属性，
     * 这种情况下可以手动调用此方法显式注册属性类型。
     *
     * @param classDefinition 要注册的类定义。
     * @param property 要注册的属性,注意属性名不能以 _ 或 $ 符开头。
     * @param type 要注册的类型,例如：“boolean","number","string","Array","lark.Rectangle"
     * @param asDefault 是否将此属性注册为组件的默认属性,一个组件只可以设置一个默认属性。注册了组件默认属性后，在EXML中可以使用省略属性节点的写法，
     * 例如：
     *
     * <e:Scroller>
     *     <e:viewport>
     *         <e:Group/>
     *     </e:viewport>
     * </e:Scroller>
     *
     * 因为 viewport 已经注册为 Scroller 的默认属性，上面的例子可以等效为：
     *
     * <e:Scroller>
     *     <e:Group/>
     * </e:Scroller>
     *
     */
    function registerProperty(classDefinition: any, property: string, type: string, asDefault?: boolean): void;
}
declare module swan.sys {
}
declare module swan.sys {
    class MatrixUtil {
        static fitBounds(width: number, height: number, matrix: lark.Matrix, explicitWidth: number, explicitHeight: number, preferredWidth: number, preferredHeight: number, minWidth: number, minHeight: number, maxWidth: number, maxHeight: number): lark.Point;
    }
}
declare module swan {
    /**
     * 视图状态设置属性操作
     */
    class SetProperty implements IOverride {
        /**
         * 创建一个SetProperty实例
         */
        constructor(target: string, name: string, value: any);
        /**
         * 要修改的属性名
         */
        name: string;
        /**
         * 目标实例名
         */
        target: string;
        /**
         * 属性值
         */
        value: any;
        /**
         * 旧的属性值
         */
        private oldValue;
        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        apply(host: Skin, parent: lark.DisplayObjectContainer): void;
        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        remove(host: Skin, parent: lark.DisplayObjectContainer): void;
        /**
         * 设置属性值
         */
        private setPropertyValue(obj, name, value, valueForType);
        /**
         * 转成Boolean值
         */
        private toBoolean(value);
    }
}
declare module swan {
    /**
     * @language en_US
     * The ArrayCollection class is a wrapper class that exposes an <code>any[]</code> as a collection that can be
     * accessed and manipulated using the methods and properties of the <code>ICollection</code> interfaces.
     * ArrayCollection can notify the view to update item when data source changed.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ArrayCollection 类是数组的集合类数据结构包装器，可使用<code>ICollection</code>接口的方法和属性对其进行访问和处理。
     * 使用这种数据结构包装普通数组，能在数据源发生改变的时候主动通知视图刷新变更数据项。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class ArrayCollection extends lark.EventEmitter implements ICollection {
        /**
         * @language en_US
         * Constructor. <p/>
         * Creates a new ArrayCollection using the specified source array.
         * If no array is specified an empty array will be used.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。<p/>
         * 用指定的原始数组创建一个 ArrayCollection 实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor(source?: any[]);
        /**
         * @private
         */
        private _source;
        /**
         * @language en_US
         * The source of data in the ArrayCollection.
         * The ArrayCollection object does not represent any changes that you make
         * directly to the source array. Always use the ICollection methods to view the collection.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源
         * 通常情况下请不要直接调用Array的方法操作数据源，否则对应的视图无法收到数据改变的通知。通常都是通过ICollection的接口方法来查看数据。
         * 若对数据源进行了修改，请手动调用refresh()方法刷新数据。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        source: any[];
        /**
         * @language en_US
         * Applies the sort and filter to the view.
         * The ArrayCollection does not detect source data changes automatically,
         * so you must call the <code>refresh()</code>
         * method to update the view after changing the source data.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在对数据源进行排序或过滤操作后可以手动调用此方法刷新所有数据,以更新视图。
         * ArrayCollection 不会自动检原始数据进行了改变,所以你必须调用<code>refresh()</code>方法去更新显示。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        refresh(): void;
        /**
         * @inheritDoc
         */
        length: number;
        /**
         * @language en_US
         * Adds the specified item to the end of the list.
         * Equivalent to <code>addItemAt(item, length)</code>.
         * @param item The item to add.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 向列表末尾添加指定项目。等效于 <code>addItemAt(item, length)</code>。
         * @param item 要被添加的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        addItem(item: any): void;
        /**
         * @language en_US
         * Adds the item at the specified index.
         * The index of any item greater than the index of the added item is increased by one.
         * If the the specified index is less than zero or greater than the length
         * of the list, a Error which code is 1007 is thrown.
         * @param item The item to place at the index.
         * @param index The index at which to place the item.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在指定的索引处添加项目。
         * 任何大于已添加项目的索引的项目索引都会增加 1。
         * 如果指定的索引比0小或者比最大长度要大。则会抛出1007异常。
         * @param item 要添加的项
         * @param index 要添加的指定索引位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        addItemAt(item: any, index: number): void;
        /**
         * @inheritDoc
         */
        getItemAt(index: number): any;
        /**
         * @inheritDoc
         */
        getItemIndex(item: any): number;
        /**
         * @language en_US
         * Notifies the view that an item has been updated.
         * @param item The item within the view that was updated.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 通知视图，某个项目的属性已更新。
         * @param item 视图中需要被更新的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        itemUpdated(item: any): void;
        /**
         * @language en_US
         * Removes all items from the list.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 删除列表中的所有项目。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        removeAll(): void;
        /**
         * @language en_US
         * Removes the item at the specified index and returns it.
         * Any items that were after this index are now one index earlier.
         * @param index The index from which to remove the item.
         * @return The item that was removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 删除指定索引处的项目并返回该项目。原先位于此索引之后的所有项目的索引现在都向前移动一个位置。
         * @param index 要被移除的项的索引。
         * @return 被移除的项。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        removeItemAt(index: number): any;
        /**
         * @language en_US
         * Replaces the item at the specified index.
         * @param item The new item to be placed at the specified index.
         * @param index The index at which to place the item.
         * @return The item that was replaced, or <code>null</code> if none.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 替换在指定索引处的项目，并返回该项目。
         * @param item 要在指定索引放置的新的项。
         * @param index 要被替换的项的索引位置。
         * @return 被替换的项目，如果没有该项则返回<code>null</code> 。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        replaceItemAt(item: any, index: number): any;
        /**
         * @language en_US
         * Replaces all items with a new source data, this method can not reset the scroller position of view.
         * @param newSource new source data.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 用新数据源替换原始数据源，此方法与直接设置source不同，它不会导致目标视图重置滚动位置。
         * @param newSource 新数据。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        replaceAll(newSource: any[]): void;
        /**
         * @private
         * 抛出事件
         */
        private dispatchCoEvent(kind, location?, oldLocation?, items?, oldItems?);
    }
}
declare module swan.sys {
    /**
     * EXML配置管理器实例
     */
    var exmlConfig: EXMLConfig;
    class EXMLParser {
        constructor();
        /**
         * 获取重复的ID名
         */
        getRepeatedIds: (xml: lark.XML) => string[];
        private getIds;
        private repeatedIdMap;
        private checkDeclarations;
        /**
         * 当前类
         */
        private currentClass;
        /**
         * 当前编译的类名
         */
        private currentClassName;
        /**
         * 当前要编译的EXML文件
         */
        private currentXML;
        /**
         * id缓存字典
         */
        private idDic;
        /**
         * 状态代码列表
         */
        private stateCode;
        private stateNames;
        /**
         * 需要单独创建的实例id列表
         */
        private stateIds;
        private idToNode;
        private skinParts;
        private bindings;
        private declarations;
        /**
         * 延迟赋值字典
         */
        private delayAssignmentDic;
        /**
         * 编译指定的XML对象为JavaScript代码。
         * @param xmlData 要编译的EXML文件内容
         * @param className 要编译成的完整类名，包括模块名。
         */
        parse(text: string): {
            new (): any;
        };
        /**
         * 编译指定的XML对象为CpClass对象。
         */
        private parseClass(xmlData, className);
        /**
         * 开始编译
         */
        private startCompile();
        /**
         * 添加必须的id
         */
        private addIds(items);
        /**
         * 是否为内部类。
         */
        private isInnerClass(node);
        /**
         * 检测指定节点的属性是否含有视图状态
         */
        private containsState(node);
        /**
         * 为指定节点创建id属性
         */
        private createIdForNode(node);
        /**
         * 获取节点ID
         */
        private getNodeId(node);
        /**
         * 为指定节点创建变量
         */
        private createVarForNode(node);
        /**
         * 为指定节点创建初始化函数,返回函数名引用
         */
        private createFuncForNode(node);
        /**
         * 检查目标类名是否是基本数据类型
         */
        private isBasicTypeData(className);
        /**
         * 为指定基本数据类型节点实例化,返回实例化后的值。
         */
        private createBasicTypeForNode(node);
        /**
         * 将节点属性赋值语句添加到代码块
         */
        private addAttributesToCodeBlock(cb, varName, node);
        /**
         * 初始化子项
         */
        private initlizeChildNode(node, cb, varName);
        /**
         * 解析内部类节点，并返回类名。
         */
        private parseInnerClass(node);
        /**
         * 添加多个子节点到指定的属性
         */
        private addChildrenToProp(children, type, prop, cb, varName, errorInfo, propList, node);
        /**
         * 指定节点是否是属性节点
         */
        private isProperty(node);
        /**
         * 是否是普通赋值的key
         */
        private isNormalKey(key);
        /**
         * 格式化key
         */
        private formatKey(key, value);
        /**
         * 格式化值
         */
        private formatValue(key, value, node);
        /**
         * 格式化字符串
         */
        private formatString(value);
        /**
         /**
         * 转换HTML实体字符为普通字符
         */
        private unescapeHTMLEntity(str);
        /**
         * 创建构造函数
         */
        private createConstructFunc();
        /**
         * 是否含有includeIn和excludeFrom属性
         */
        private isStateNode(node);
        /**
         * 获取视图状态名称列表
         */
        private getStateNames();
        /**
         * 解析视图状态代码
         */
        private createStates(parentNode);
        /**
         * 检查指定的ID是否创建了类成员变量，若没创建则为其创建。
         */
        private checkIdForState(node);
        /**
         * 通过视图状态名称获取对应的视图状态
         */
        private getStateByName(name, node);
        /**
         * 寻找节点的临近节点ID和位置
         */
        private findNearNodeId(node);
        /**
         * 获取节点的完整类名，包括模块名
         */
        private getClassNameOfNode(node);
    }
}
declare module swan {
    /**
     * 集合类型数据改变事件
     */
    class CollectionEvent extends lark.Event {
        /**
         * 集合类数据发生改变
         */
        static COLLECTION_CHANGE: string;
        /**
         * 创建一个 CollectionEvent 实例
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, kind?: string, location?: number, oldLocation?: number, items?: any[], oldItems?: any[]);
        /**
         * 指示发生的事件类型。此属性值可以是 CollectionEventKind 类中的一个值，也可以是 null，用于指示类型未知。
         */
        kind: string;
        /**
         * 受事件影响的项目的列表
         */
        items: any[];
        /**
         * 仅当kind的值为CollectionEventKind.REPLACE时，表示替换前的项目列表
         */
        oldItems: any[];
        /**
         * 如果 kind 值为 CollectionEventKind.ADD、 CollectionEventKind.MOVE、
         * CollectionEventKind.REMOVE 或 CollectionEventKind.REPLACE，
         * CollectionEventKind.UPDATE
         * 则此属性为 items 属性中指定的项目集合中零号元素的的索引。
         */
        location: number;
        /**
         * 如果 kind 的值为 CollectionEventKind.MOVE，
         * 则此属性为 items 属性中指定的项目在目标集合中原来位置的从零开始的索引。
         */
        oldLocation: number;
        protected clean(): void;
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        static emitCollectionEvent(target: lark.IEventEmitter, eventType: string, kind?: string, location?: number, oldLocation?: number, items?: any[], oldItems?: any[]): boolean;
    }
}
declare module swan.sys {
    /**
     * 失效验证管理器
     */
    class Validator extends lark.EventEmitter {
        /**
         * 创建一个Validator对象
         */
        constructor();
        private targetLevel;
        private invalidatePropertiesFlag;
        private invalidateClientPropertiesFlag;
        private invalidatePropertiesQueue;
        /**
         * 标记组件属性失效
         */
        invalidateProperties(client: UIComponent): void;
        /**
         * 验证失效的属性
         */
        private validateProperties();
        private invalidateSizeFlag;
        private invalidateClientSizeFlag;
        private invalidateSizeQueue;
        /**
         * 标记需要重新测量尺寸
         */
        invalidateSize(client: UIComponent): void;
        /**
         * 测量尺寸
         */
        private validateSize();
        private invalidateDisplayListFlag;
        private invalidateDisplayListQueue;
        /**
         * 标记需要重新布局
         */
        invalidateDisplayList(client: UIComponent): void;
        /**
         * 重新布局
         */
        private validateDisplayList();
        private eventDisplay;
        /**
         * 是否已经添加了事件监听
         */
        private listenersAttached;
        /**
         * 添加事件监听
         */
        private attachListeners();
        /**
         * 执行属性应用
         */
        private doPhasedInstantiationCallBack(event?);
        private doPhasedInstantiation();
        /**
         * 使大于等于指定组件层级的元素立即应用属性
         * @param target 要立即应用属性的组件
         */
        validateClient(target: UIComponent): void;
    }
}
declare module swan {
    /**
     * RadioButtonGroup 组件定义一组 RadioButton 组件，这些组件相互排斥；因此，用户每次只能选择一个 RadioButton 组件
     */
    class RadioButtonGroup extends lark.EventEmitter {
        /**
         * 创建一个RadioButtonGroup实例
         */
        constructor();
        /**
         * 单选按钮列表
         */
        private radioButtons;
        /**
         * 获取指定索引的单选按钮
         * @param index 单选按钮的索引
         */
        getRadioButtonAt(index: number): RadioButton;
        /**
         * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮。
         */
        enabled: boolean;
        /**
         * 组内单选按钮数量
         */
        numRadioButtons: number;
        private _selectedValue;
        /**
         * 当前被选中的单选按钮的value属性值。注意，此属性仅当目标RadioButton在显示列表时有效。
         */
        selectedValue: any;
        private _selection;
        /**
         * 当前被选中的单选按钮引用,注意，此属性仅当目标RadioButton在显示列表时有效。
         */
        selection: RadioButton;
        /**
         * 改变选中项
         */
        private changeSelection(index, fireChange?);
        /**
         * 单选按钮添加到显示列表
         */
        private addedHandler(event);
        /**
         * 单选按钮从显示列表移除
         */
        private removedHandler(event);
    }
}
declare module swan {
    /**
     * State 类定义视图状态，即组件的特定视图。
     */
    class State extends lark.LarkObject {
        /**
         * 创建一个State实例
         */
        constructor(name: string, overrides: IOverride[]);
        /**
         * 视图状态的名称。给定组件的状态名称必须唯一。必须设置此属性。
         */
        name: string;
        /**
         * 该视图状态的覆盖，表现为实现 IOverride 接口的对象的数组。
         * 这些覆盖在进入状态时按顺序应用，在退出状态时按相反的顺序删除。
         */
        overrides: IOverride[];
        /**
         * 此视图状态作为 string 数组所属的状态组。
         */
        stateGroups: string[];
        /**
         * 初始化视图状态
         */
        initialize(host: any, stage: lark.Stage): void;
    }
}
declare module swan.sys {
    class StateClient {
        /**
         * 为此组件定义的视图状态。
         */
        states: swan.State[];
        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        currentState: string;
        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState();
        /**
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         */
        hasState(stateName: string): boolean;
        /**
         * 初始化所有视图状态
         */
        private initializeStates(stage);
    }
    class StateValues {
        intialized: boolean;
        statesMap: any;
        states: swan.State[];
        oldState: string;
        explicitState: string;
        currentState: string;
        parent: lark.DisplayObjectContainer;
        stateIsDirty: boolean;
    }
}
declare module swan.sys {
    const enum AddPosition {
        /**
         * 添加父级容器的底层
         */
        FIRST = 0,
        /**
         * 添加在父级容器的顶层
         */
        LAST = 1,
        /**
         * 添加在相对对象之前
         */
        BEFORE = 2,
        /**
         * 添加在相对对象之后
         */
        AFTER = 3,
    }
}
declare module swan {
    /**
     * 视图添加状态显示元素操作
     */
    class AddItems implements IOverride {
        /**
         * 创建一个AddItems实例
         */
        constructor(target: string, propertyName: string, position: number, relativeTo: string);
        /**
         * 要添加到的属性
         */
        propertyName: string;
        /**
         * 添加的位置，有效值为: "first","last","before","after"
         */
        position: number;
        /**
         * 相对的显示元素的实例名
         */
        relativeTo: string;
        /**
         * 目标实例名
         */
        target: string;
        /**
         * 应用覆盖。将保留原始值，以便以后可以在 remove() 方法中恢复该值。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        apply(host: any, parent: lark.DisplayObjectContainer): void;
        /**
         * 删除覆盖。在 apply() 方法中记住的值将被恢复。
         * @param host 含有视图状态的组件。
         * @param parent 子项添加到的父级容器。
         */
        remove(host: any, parent: lark.DisplayObjectContainer): void;
    }
}
declare module swan {
    /**
     * 容器布局基类。若要创建使用 Group 容器的自定义布局，必须扩展 LayoutBase 或其子类之一。
     * 子类必须实现 updateDisplayList() 方法（定位 target Group 的子项并调整这些子项的大小）和 measure() 方法（计算 target 的默认大小）。
     */
    class LayoutBase extends lark.EventEmitter {
        constructor();
        /**
         * 目标容器
         */
        target: Group;
        /**
         * 若要配置容器使用虚拟布局，请为与容器关联的布局的 useVirtualLayout 属性设置为 true。
         * 只有布局设置为 VerticalLayout、HorizontalLayout
         * 或 TileLayout 的 DataGroup 或 SkinnableDataContainer
         * 才支持虚拟布局。不支持虚拟化的布局子类必须禁止更改此属性。
         */
        useVirtualLayout: boolean;
        setTypicalSize(width: number, height: number): void;
        /**
         * 滚动条位置改变
         */
        scrollPositionChanged(): void;
        /**
         * 清理虚拟布局缓存的数据
         */
        clearVirtualLayoutCache(): void;
        /**
         * 在已添加布局元素之后且在验证目标的大小和显示列表之前，由目标调用。
         * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
         * @param index 发生改变的子项索引
         */
        elementAdded(index: number): void;
        /**
         * 必须在已删除布局元素之后且在验证目标的大小和显示列表之前，由目标调用此方法。
         * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
         * @param index 发生改变的子项索引
         */
        elementRemoved(index: number): void;
        /**
         * 获取在视图中的索引列表
         */
        getElementIndicesInView(): number[];
        /**
         * 测量组件尺寸大小
         */
        measure(): void;
        /**
         * 更新显示列表
         */
        updateDisplayList(width: number, height: number): void;
    }
}
declare module swan {
    /**
     * @language en_US
     * The Watcher class defines utility method that you can use with bindable properties.
     * These methods let you define an event handler that is executed whenever a bindable property is updated.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class Watcher {
        /**
         * @language en_US
         * Creates and starts a Watcher instance.
         * The Watcher can only watch the property of a Object which host is instance of IEventEmitter.
         * @param host The object that hosts the property or property chain to be watched.
         * You can use the use the <code>reset()</code> method to change the value of the <code>host</code> argument
         * after creating the Watcher instance.
         * The <code>host</code> maintains a list of <code>handlers</code> to invoke when <code>prop</code> changes.
         * @param chain A value specifying the property or chain to be watched.
         * For example, to watch the property <code>host.a.b.c</code>,
         * call the method as: <code>watch(host, ["a","b","c"], ...)</code>.
         * @param handler  An event handler function called when the value of the watched property
         * (or any property in a watched chain) is modified.
         * @param thisObject <code>this</code> object of which binding with handler
         * @returns he ChangeWatcher instance, if at least one property name has been specified to
         * the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建并启动 Watcher 实例。注意：Watcher 只能监视 host 为 IEventEmitter 对象的属性改变。若属性链中某个属性所对应的实例不是 IEventEmitter，
         * 则属性链中在它之后的属性改变将无法检测到。
         * @param host 用于承载要监视的属性或属性链的对象。
         * 创建Watcher实例后，您可以利用<code>reset()</code>方法更改<code>host</code>参数的值。
         * 当<code>prop</code>改变的时候，会使得host对应的一系列<code>handlers</code>被触发。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：watch¬(host, ["a","b","c"], ...)。
         * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
         * @param thisObject handler 方法绑定的this对象
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        static watch(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher;
        /**
         * @private
         * 检查属性是否可以绑定。若还未绑定，尝试添加绑定事件。若是只读或只写属性，返回false。
         */
        private static checkBindable(host, property);
        /**
         * @language en_US
         * Constructor.
         * Not for public use. This method is called only from the <code>watch()</code> method.
         * See the <code>watch()</code> method for parameter usage.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数，非公开。只能从 watch() 方法中调用此方法。有关参数用法，请参阅 watch() 方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor(property: string, handler: (value: any) => void, thisObject: any, next?: Watcher);
        /**
         * @private
         */
        private host;
        /**
         * @private
         */
        private property;
        /**
         * @private
         */
        private handler;
        /**
         * @private
         */
        private thisObject;
        /**
         * @private
         */
        private next;
        /**
         * @private
         */
        private isExecuting;
        /**
         * @language en_US
         * Detaches this Watcher instance, and its handler function, from the current host.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从当前宿主中断开此 Watcher 实例及其处理函数。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        unwatch(): void;
        /**
         * @language en_US
         * Retrieves the current value of the watched property or property chain, or null if the host object is null.
         * @example
         * <code>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </code>
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检索观察的属性或属性链的当前值，当宿主对象为空时此值为空。
         * @example
         * <code>
         * watch(obj, ["a","b","c"], ...).getValue() === obj.a.b.c
         * </code>
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        getValue(): any;
        /**
         * @language en_US
         * Sets the handler function.s
         * @param handler The handler function. This argument must not be null.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置处理函数。
         * @param handler 处理函数，此参数必须为非空。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        setHandler(handler: (value: any) => void, thisObject: any): void;
        /**
         * @language en_US
         * Resets this ChangeWatcher instance to use a new host object.
         * You can call this method to reuse a watcher instance on a different host.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 重置此 Watcher 实例使用新的宿主对象。
         * 您可以通过该方法实现一个Watcher实例用于不同的宿主。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        reset(newHost: lark.IEventEmitter): void;
        /**
         * @private
         *
         * @returns
         */
        private getHostPropertyValue();
        /**
         * @private
         *
         * @param event
         */
        private wrapHandler(event);
    }
}
declare module swan {
    /**
     * 列表项单击事件
     */
    class ItemTapEvent extends lark.Event {
        /**
         *
         */
        static ITEM_TAP: string;
        /**
         * 触发触摸事件的项呈示器数据源项。
         */
        item: any;
        /**
         * 触发触摸事件的项呈示器。
         */
        itemRenderer: IItemRenderer;
        /**
         * 触发触摸事件的项索引
         */
        itemIndex: number;
        protected clean(): void;
        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        static emitItemTapEvent(target: lark.IEventEmitter, eventType: string, itemRenderer?: IItemRenderer): boolean;
    }
}
declare module swan {
}
declare module swan {
    /**
     * UI事件
     */
    class UIEvent extends lark.Event {
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 组件创建完成
         */
        static CREATION_COMPLETE: string;
        /**
         * 改变结束
         */
        static CHANGE_END: string;
        /**
         * 改变开始
         */
        static CHANGE_START: string;
        /**
         * 即将关闭面板事件
         */
        static CLOSING: string;
        /**
         * UI组件在父级容器中的坐标发生改变事件
         */
        static MOVE: string;
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        static emitUIEvent(target: lark.IEventEmitter, eventType: string): boolean;
    }
}
declare module swan {
    /**
     * 皮肤主题。注意：皮肤主题是一次性设置的默认值,并不能运行时切换所有组件默认皮肤。切换单个皮肤您可以自行对Component.skinName赋值来修改。
     */
    class Theme extends lark.EventEmitter {
        /**
         * 创建一个主题实例
         * @param configURL 要加载并解析的外部主题配置文件路径。若传入null，将不进行配置文件加载，
         * 之后需要在外部以代码方式手动调用 mapSkin() 方法完成每条默认皮肤名的注册。
         * @param stage 当前舞台引用。传入此参数，主题会自动注册自身到舞台上。
         * 若传入null，需要在外部手动调用stage.registerImplementation("swan.Theme",theme) 来完成主题的注册。
         */
        constructor(configURL: string, stage: lark.Stage);
        private initialized;
        private load(url);
        private onConfigLoaded(event);
        private delayList;
        private hadleDelayList();
        private skinMap;
        private flagToClassName;
        /**
         * 根据主机组件，获取对应的默认皮肤名。查询规则如下：
         * 1.使用client的hostComponentKey作为键查询默认皮肤名
         * 2.使用client的类名作为键查询默认皮肤名
         * 3.使用client的父类名作为键查询默认皮肤名
         * 4.不断重复3直到查询到皮肤名或父类为swan.Component时停止
         * @param client 要获取默认皮肤的组件
         */
        getSkinName(client: Component): string;
        private findSkinName(prototype);
        /**
         * 为指定的主机组件映射一个默认皮肤
         * @param hostComponentKey 主机组件名称，例如：“swan.Button”
         * @param skinName 皮肤名称 例如："app.MyButtonSkin";
         */
        mapSkin(hostComponentKey: string, skinName: string): void;
    }
}
declare module swan {
}
declare module EXML {
    /**
     * 解析一个 EXML 文件的文本内容为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param text 要解析的 EXML 文件内容
     */
    function parse(text: string): {
        new (): any;
    };
    /**
     * 加载并解析一个外部的 EXML 文件为一个类定义。您可以在 EXML 文件的根节点上声明 class 属性作为要注册到全局的类名。
     * 若指定的类名已经存在，将会注册失败，并输出一个警告。注册成功后，您也可以通过 lark.getDefinitionByName(className) 方法获取这个 EXML 文件对应的类定义。
     * @param url 要加载的 EXML 文件路径
     * @param callBack 加载并解析完成后的回调函数，无论加载成功还是失败，此函数均会被回调。失败时将传入 undefined 作为回调函数参数。
     * @param thisObject 回调函数的 this 引用
     */
    function load(url: string, callBack?: (clazz: any, url: string) => void, thisObject?: any): void;
}
declare module swan {
    /**
     * @language en_US
     * The Binding class defines utility methods for performing data binding.
     * You can use the methods defined in this class to configure data bindings.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 绑定工具类，用于执行数据绑定用的方法集。您可以使用此类中定义的方法来配置数据绑定。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class Binding {
        /**
         * @language en_US
         * Binds a property, <prop>prop</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * @param host The object that hosts the property or property chain to be watched.
         * The <code>host</code> maintains a list of <code>targets</code> to update theirs <code>prop</code> when <code>chain</code> changes.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param target The Object defining the property to be bound to <code>chain</code>.
         * @param prop The name of the public property defined in the <code>site</code> Object to be bound.
         * @returns A ChangeWatcher instance, if at least one property name has been specified
         * to the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绑定一个对象的属性值到要监视的对象属性上。
         * @param host 用于承载要监视的属性或属性链的对象。
         * 当 <code>host</code>上<code>chain</code>所对应的值发生改变时，<code>target</code>上的<code>prop</code>属性将被自动更新。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 <code>host.a.b.c</code>，需按以下形式调用此方法：<code>bindProperty(host, ["a","b","c"], ...)。</code>
         * @param target 本次绑定要更新的目标对象。
         * @param prop 本次绑定要更新的目标属性名称。
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        static bindProperty(host: any, chain: string[], target: any, prop: string): Watcher;
        /**
         * @language en_US
         * Binds a callback, <prop>handler</code> on the <code>target</code> Object, to a bindable property or peoperty chain.
         * Callback method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param host The object that hosts the property or property chain to be watched.
         * @param chain A value specifying the property or chain to be watched. For example, when watch the property <code>host.a.b.c</code>,
         * you need call the method like this: <code>indProperty(host, ["a","b","c"], ...)</code>
         * @param handler method to invoke with an argument of the current value of <code>chain</code> when that value changes.
         * @param thisObject <code>this</code> object of binding method
         * @returns A ChangeWatcher instance, if at least one property name has been  specified to the <code>chain</code> argument; null otherwise.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绑定一个回调函数到要监视的对象属性上。当 host上 chain 所对应的值发生改变时，handler 方法将被自动调用。
         * @param host 用于承载要监视的属性或属性链的对象。
         * @param chain 用于指定要监视的属性链的值。例如，要监视属性 host.a.b.c，需按以下形式调用此方法：bindSetter(host, ["a","b","c"], ...)。
         * @param handler 在监视的目标属性链中任何属性的值发生改变时调用的事件处理函数。
         * @param thisObject handler 方法绑定的this对象
         * @returns 如果已为 chain 参数至少指定了一个属性名称，则返回 Watcher 实例；否则返回 null。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        static bindHandler(host: any, chain: string[], handler: (value: any) => void, thisObject: any): Watcher;
    }
}
declare module swan {
    /**
     * UI 显示对象基类
     * @event lark.Event.RESIZE 当UI组件的尺寸发生改变时调度
     * @event swan.UIEvent.MOVE 当UI组件在父级容器中的位置发生改变时调度
     * @event swan.UIEvent.CREATION_COMPLETE 当UI组件第一次被添加到舞台并完成初始化后调度
     */
    interface UIComponent extends lark.DisplayObject {
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan.sys {
    const enum UIKeys {
        left = 0,
        right = 1,
        top = 2,
        bottom = 3,
        horizontalCenter = 4,
        verticalCenter = 5,
        percentWidth = 6,
        percentHeight = 7,
        explicitWidth = 8,
        explicitHeight = 9,
        width = 10,
        height = 11,
        minWidth = 12,
        maxWidth = 13,
        minHeight = 14,
        maxHeight = 15,
        measuredWidth = 16,
        measuredHeight = 17,
        oldPreferWidth = 18,
        oldPreferHeight = 19,
        oldX = 20,
        oldY = 21,
        oldWidth = 22,
        oldHeight = 23,
        invalidatePropertiesFlag = 24,
        invalidateSizeFlag = 25,
        invalidateDisplayListFlag = 26,
        layoutWidthExplicitlySet = 27,
        layoutHeightExplicitlySet = 28,
        initialized = 29,
    }
    /**
     * Swan 显示对象基类模板。仅作为 UIComponent 的默认实现，为lark.sys.implemenetUIComponenet()方法提供代码模板。
     * 注意：在此类里不允许直接使用super关键字访问父类方法。一律使用this.$super属性访问。
     */
    class UIComponentImpl extends lark.DisplayObject implements swan.UIComponent {
        /**
         * 构造函数
         */
        constructor();
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues();
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag(event?);
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 立即验证自身的尺寸。
         */
        private validateSizeNow();
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        private setActualSize(w, h);
        /**
         * 标记属性失效
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        private measureSizes();
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 更新最终的组件宽高
         */
        private updateFinalSize();
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        private getPreferredUWidth();
        private getPreferredUHeight();
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
        private applyMatrix(bounds, w, h);
    }
    /**
     * 拷贝模板类的方法体和属性到目标类上。
     * @param target 目标类
     * @param template 模板类
     */
    function mixin(target: any, template: any): void;
    /**
     * 自定义类实现UIComponent的步骤：
     * 1.在自定义类的构造函数里调用：this.initializeUIValues();
     * 2.拷贝UIComponent接口定义的所有内容(包括注释掉的protected函数)到自定义类，将所有子类需要覆盖的方法都声明为空方法体。
     * 3.在定义类结尾的外部调用sys.implementUIComponent()，并传入自定义类。
     * 4.若覆盖了某个UIComponent的方法，需要手动调用UIComponentImpl.prototype["方法名"].call(this);
     * @param descendant 自定义的UIComponent子类
     * @param base 自定义子类继承的父类
     */
    function implementUIComponent(descendant: any, base: any, isContainer?: boolean): void;
}
declare module swan {
    /**
     * BasicLayout 类根据其各个设置彼此独立地排列布局元素。
     * BasicLayout（也称为绝对布局）要求显式定位每个容器子代。可以使用子代的 x 和 y 属性，或使用约束来定位每个子代。
     */
    class BasicLayout extends LayoutBase {
        /**
         * 创建一个基本布局实例
         */
        constructor();
        /**
         * BasicLayout不支持虚拟布局，设置这个属性无效
         */
        useVirtualLayout: boolean;
        /**
         *基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        measure(): void;
        /**
         * 调整目标的元素的大小并定位这些元素
         * @param unscaledWidth
         * @param unscaledHeight
         */
        updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
    }
}
declare module swan.sys {
    /**
     * 一个工具方法，使用BasicLayout规则测量目标对象。
     */
    function measure(target: swan.Group | swan.Component): void;
    /**
     * 一个工具方法，使用BasicLayout规则布局目标对象。
     */
    function updateDisplayList(target: swan.Group | swan.Component, unscaledWidth: number, unscaledHeight: number): lark.Point;
}
declare module swan {
    /**
     * 对象的一个属性发生更改时传递到事件侦听器的事件
     */
    class PropertyEvent extends lark.Event {
        /**
         * 属性改变
         */
        static PROPERTY_CHANGE: string;
        /**
         * 创建一个属性改变事件
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, property?: string);
        /**
         * 发生改变的属性名称。
         */
        property: string;
        /**
         * 使用指定的 EventEmitter 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param eventType 事件类型
         */
        static emitPropertyEvent(target: lark.IEventEmitter, eventType: string, property?: string): boolean;
    }
}
declare module swan {
    /**
     * 网格布局
     */
    class TileLayout extends LayoutBase {
        /**
         * 创建一个网格布局实例
         */
        constructor();
        /**
         * 标记horizontalGap被显式指定过
         */
        private explicitHorizontalGap;
        private _horizontalGap;
        /**
         * 列之间的水平空间（以像素为单位）。
         */
        horizontalGap: number;
        /**
         * 标记verticalGap被显式指定过
         */
        private explicitVerticalGap;
        private _verticalGap;
        /**
         * 行之间的垂直空间（以像素为单位）。
         */
        verticalGap: number;
        private _columnCount;
        /**
         * 实际列计数。
         */
        columnCount: number;
        private _requestedColumnCount;
        /**
         * 要显示的列数。设置为0表示自动确定列计数,默认值0。
         * 注意:当orientation为TileOrientation.COLUMNS(逐列排列元素)且tagert被显式设置宽度时，此属性无效。
         */
        requestedColumnCount: number;
        private _rowCount;
        /**
         * 实际行计数。
         */
        rowCount: number;
        private _requestedRowCount;
        /**
         * 要显示的行数。设置为0表示自动确定行计数,默认值0。
         * 注意:当orientation为TileOrientation.ROWS(即逐行排列元素,此为默认值)且target被显式设置高度时，此属性无效。
         */
        requestedRowCount: number;
        /**
         * 外部显式指定的列宽
         */
        private explicitColumnWidth;
        private _columnWidth;
        /**
         * 实际列宽（以像素为单位）。 若未显式设置，则从根据最宽的元素的宽度确定列宽度。
         */
        columnWidth: number;
        /**
         * 外部显式指定的行高
         */
        private explicitRowHeight;
        private _rowHeight;
        /**
         * 行高（以像素为单位）。 如果未显式设置，则从元素的高度的最大值确定行高度。
         */
        rowHeight: number;
        private _paddingLeft;
        /**
         * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
         */
        paddingLeft: number;
        private _paddingRight;
        /**
         * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
         */
        paddingRight: number;
        private _paddingTop;
        /**
         * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
         */
        paddingTop: number;
        private _paddingBottom;
        /**
         * 容器的底边缘与最后一个布局元素的底边缘之间的像素数,默认值：0。
         */
        paddingBottom: number;
        private _horizontalAlign;
        /**
         * 指定如何在水平方向上对齐单元格内的元素。
         * 支持的值有 HorizontalAlign.LEFT、HorizontalAlign.CENTER、
         * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
         * 默认值：JustifyAlign.JUSTIFY
         */
        horizontalAlign: string;
        private _verticalAlign;
        /**
         * 指定如何在垂直方向上对齐单元格内的元素。
         * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
         * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
         * 默认值：JustifyAlign.JUSTIFY。
         */
        verticalAlign: string;
        private _columnAlign;
        /**
         * 指定如何将完全可见列与容器宽度对齐。
         * 设置为 ColumnAlign.LEFT 时，它会关闭列两端对齐。在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。
         * 设置为 ColumnAlign.JUSTIFY_USING_GAP 时，horizontalGap 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
         * horizontalGap 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
         * 请注意显式设置 horizontalGap 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。
         * 设置为 ColumnAlign.JUSTIFY_USING_WIDTH 时，columnWidth 的实际值将增大，
         * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 columnWidth 属性不会关闭两端对齐。
         * 它仅确定初始列宽度值。两端对齐可能会增大它。
         */
        columnAlign: string;
        private _rowAlign;
        /**
         * 指定如何将完全可见行与容器高度对齐。
         * 设置为 RowAlign.TOP 时，它会关闭列两端对齐。在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。
         *
         * 设置为 RowAlign.JUSTIFY_USING_GAP 时，verticalGap 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，verticalGap 的值会增大，
         * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 verticalGap
         * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。
         *
         * 设置为 RowAlign.JUSTIFY_USING_HEIGHT 时，rowHeight 的实际值会增大，
         * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 rowHeight
         * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。
         */
        rowAlign: string;
        private _orientation;
        /**
         * 指定是逐行还是逐列排列元素。默认值：TileOrientation.ROWS
         */
        orientation: string;
        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        private invalidateTargetLayout();
        /**
         * 基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        measure(): void;
        /**
         * 计算行和列的尺寸及数量
         */
        private calculateRowAndColumn(explicitWidth, explicitHeight);
        /**
         * 缓存的最大子对象宽度
         */
        private maxElementWidth;
        /**
         * 缓存的最大子对象高度
         */
        private maxElementHeight;
        /**
         * 更新最大子对象尺寸
         */
        private updateMaxElementSize();
        /**
         * 更新虚拟布局的最大子对象尺寸
         */
        private doUpdateMaxElementSize(startIndex, endIndex);
        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        clearVirtualLayoutCache(): void;
        /**
         * 当前视图中的第一个元素索引
         */
        private startIndex;
        /**
         * 当前视图中的最后一个元素的索引
         */
        private endIndex;
        /**
         * 视图的第一个和最后一个元素的索引值已经计算好的标志
         */
        private indexInViewCalculated;
        /**
         * scrollV 或 scrollH 属性更改时调用
         */
        scrollPositionChanged(): void;
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        private getIndexInView();
        /**
         * 调整目标的元素的大小并定位这些元素
         */
        updateDisplayList(width: number, height: number): void;
        /**
         * 为单个元素布局
         */
        private sizeAndPositionElement(element, cellX, cellY, cellWidth, cellHeight);
        /**
         * 为两端对齐调整间隔或格子尺寸
         */
        private adjustForJustify(width, height);
    }
}
declare module swan {
    /**
     * 线性布局基类，通常作为 HorizontalLayout 和 VerticalLayout 的父类。
     */
    class LinearLayoutBase extends LayoutBase {
        /**
         * 布局元素的水平对齐策略。请使用 HorizontalAlign 定义的常量。
         */
        horizontalAlign: string;
        /**
         * 布局元素的竖直对齐策略。请使用 VerticalAlign 定义的常量。
         */
        verticalAlign: string;
        /**
         * 布局元素之间的间隔空间（以像素为单位）
         */
        gap: number;
        /**
         * 容器的左边缘与布局元素的左边缘之间的最少像素数,默认值：0。
         */
        paddingLeft: number;
        /**
         * 容器的右边缘与布局元素的右边缘之间的最少像素数,默认值：0。
         */
        paddingRight: number;
        /**
         * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,默认值：0。
         */
        paddingTop: number;
        /**
         * 容器的底边缘与最后一个布局元素的底边缘之间的像素数0,默认值：0。
         */
        paddingBottom: number;
        /**
         * 标记目标容器的尺寸和显示列表失效
         */
        protected invalidateTargetLayout(): void;
        /**
         * 基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        measure(): void;
        /**
         * 测量使用真实布局的尺寸
         */
        protected measureReal(): void;
        /**
         * 测量使用虚拟布局的尺寸
         */
        protected measureVirtual(): void;
        /**
         * 调整目标的元素的大小并定位这些元素
         */
        updateDisplayList(width: number, height: number): void;
        /**
         * 虚拟布局使用的子对象尺寸缓存
         */
        protected elementSizeTable: number[];
        /**
         * 获取指定索引的起始位置
         */
        protected getStartPosition(index: number): number;
        /**
         * 获取指定索引的元素尺寸
         */
        protected getElementSize(index: number): number;
        /**
         * 获取缓存的子对象尺寸总和
         */
        protected getElementTotalSize(): number;
        elementRemoved(index: number): void;
        /**
         * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
         */
        clearVirtualLayoutCache(): void;
        /**
         * 折半查找法寻找指定位置的显示对象索引
         */
        protected findIndexAt(x: number, i0: number, i1: number): number;
        /**
         * 虚拟布局使用的当前视图中的第一个元素索引
         */
        protected startIndex: number;
        /**
         * 虚拟布局使用的当前视图中的最后一个元素的索引
         */
        protected endIndex: number;
        /**
         * 视图的第一个和最后一个元素的索引值已经计算好的标志
         */
        protected indexInViewCalculated: boolean;
        /**
         * scrollV 或 scrollH 属性更改时调用
         */
        scrollPositionChanged(): void;
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        protected getIndexInView(): boolean;
        /**
         * 子对象最大宽度
         */
        protected maxElementSize: number;
        /**
         * 更新使用虚拟布局的显示列表
         */
        protected updateDisplayListVirtual(width: number, height: number): void;
        /**
         * 更新使用真实布局的显示列表
         */
        protected updateDisplayListReal(width: number, height: number): void;
        /**
         * 为每个可变尺寸的子项分配空白区域
         */
        protected flexChildrenProportionally(spaceForChildren: number, spaceToDistribute: number, totalPercent: number, childInfoArray: Array<any>): void;
    }
}
declare module swan.sys {
    class ChildInfo {
        layoutElement: swan.UIComponent;
        size: number;
        percent: number;
        min: number;
        max: number;
    }
}
declare module swan {
    class EditableText extends lark.TextInput implements UIComponent {
        constructor();
        private _widthConstraint;
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues;
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan {
    /**
     * 皮肤基类。通常情况下，您不需要手动创建这个类的实例，而是通过解析EXML文件后自动生成。
     */
    class Skin extends lark.LarkObject {
        /**
         * 皮肤部件名称列表
         */
        skinParts: string[];
        /**
         * 皮肤的最大宽度。仅影响主机组件的测量结果。
         */
        maxWidth: number;
        /**
         * 皮肤的最小宽度,此属性设置为大于maxWidth的值时无效。仅影响主机组件的测量结果。
         */
        minWidth: number;
        /**
         * 皮肤的最大高度。仅影响主机组件的测量结果。
         */
        maxHeight: number;
        /**
         * 皮肤的最小高度,此属性设置为大于maxHeight的值时无效。仅影响主机组件的测量结果。
         */
        minHeight: number;
        /**
         * 皮肤显式设置宽度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
         */
        width: number;
        /**
         * 皮肤显式设置高度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
         */
        height: number;
        elementsContent: lark.DisplayObject[];
        private _hostComponent;
        /**
         * 此皮肤附加到的主机组件
         */
        hostComponent: Component;
        private onAddedToStage(event?);
        /**
         * 为此组件定义的视图状态。
         */
        states: State[];
        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        currentState: string;
        /**
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         */
        hasState: (stateName: string) => boolean;
        /**
         * 初始化所有视图状态
         */
        private initializeStates;
        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState;
    }
}
declare module swan {
    /**
     * Label 是可以呈示一行或多行统一格式文本的UI组件。要显示的文本由 text 属性确定。文本格式由样式属性指定，例如 fontFamily 和 fontSize。
     * 因为 Label 运行速度快且占用内存少，所以它特别适合用于显示多个小型非交互式文本的情况，例如，项呈示器和 Button 外观中的标签。
     * 在 Label 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。
     * 如果没有为 Label 指定宽度，则由这些显式换行符确定的最长行确定 Label 的宽度。
     * 如果指定了宽度，则指定文本将在组件边界的右边缘换行，如果文本扩展到低于组件底部，则将被剪切。
     */
    class Label extends lark.TextField implements UIComponent {
        constructor(text?: string);
        private _widthConstraint;
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues;
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan.sys {
    const enum ComponentKeys {
        hostComponentKey = 0,
        skinName = 1,
        explicitState = 2,
        enabled = 3,
        stateIsDirty = 4,
        skinNameExplicitlySet = 5,
        explicitTouchChildren = 6,
        explicitTouchEnabled = 7,
        skin = 8,
    }
}
declare module swan {
    /**
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
     *
     * @event lark.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     */
    class Component extends lark.Sprite implements UIComponent {
        constructor();
        /**
         * 主机组件标识符。用于唯一确定一个组件的名称。通常用于在主题中查询默认皮肤名。
         *
         * @see swan.Theme#getSkinName()
         */
        hostComponentKey: string;
        /**
         * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径，
         */
        skinName: any;
        private onExmlLoaded(clazz, url);
        /**
         * [只读]皮肤对象实例。
         */
        skin: Skin;
        /**
         * 设置皮肤实例
         */
        protected setSkin(skin: Skin): void;
        /**
         * 关联一个对象到逻辑组件的指定皮肤部件上。通常您不需要手动调用此方法，当使用EXML文件作为组件皮肤，此方法将会被自动调用。
         * 在运行时，EXML文件内声明的id名称将作为此方法的partName参数，而id所对应的节点对象，将作为此方法的instance参数被依次传入。
         * @param partName 皮肤部件名称
         * @param instance 皮肤部件实例
         */
        setSkinPart(partName: string, instance: any): void;
        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        protected partAdded(partName: string, instance: any): void;
        /**
         * 子类覆盖此方法，以在皮肤部件从逻辑组件卸载时对其执行一些清理操作，例如移除事件监听，断开缓存的引用等。
         * @param partName 要卸载的皮肤部件名称
         * @param instance 要卸载的皮肤部件实例
         */
        protected partRemoved(partName: string, instance: any): void;
        /**
         * 组件是否可以接受用户交互。将 enabled 属性设置为 false 后，组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
         * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。默认值为 true。
         */
        enabled: boolean;
        /**
         * 组件的当前视图状态。显式设置此属性，将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
         * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
         */
        currentState: string;
        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        invalidateState(): void;
        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        protected getCurrentState(): string;
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues;
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan {
    /**
     * Group 是自动布局的容器基类。如果包含的子项内容太大需要滚动显示，可以在在 Group 外部包裹一层 Scroller 组件
     * (将 Group 实例赋值给 Scroller 组件的 viewport 属性)。Scroller 会为 Group 添加滚动的触摸操作功能，并显示垂直或水平的滚动条。
     */
    class Group extends lark.Sprite implements UIComponent {
        constructor();
        /**
         * [只写] 此属性通常在 EXML 的解析器中调用，便于快速添加多个子项。
         */
        elementsContent: lark.DisplayObject[];
        /**
         * 此容器的布局对象
         */
        layout: LayoutBase;
        /**
         * 视域的内容的宽度
         */
        contentWidth: number;
        /**
         * 视域的内容的高度
         */
        contentHeight: number;
        /**
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         */
        setContentSize(width: number, height: number): void;
        /**
         * 是否启用容器滚动。如果为 true，则将子项剪切到视区的边界，配合设置scrollH和scrollV属性将能滚动视区。
         * 如果为 false，则容器子代会从容器边界扩展过去，而设置scrollH和scrollV也无效。默认false。
         */
        scrollEnabled: boolean;
        /**
         * 可视区域水平方向起始点
         */
        scrollH: number;
        /**
         * 可视区域竖直方向起始点
         */
        scrollV: number;
        private updateScrollRect();
        /**
         * 布局元素子项的数量。
         */
        numElements: number;
        /**
         * 获取一个布局元素子项
         */
        getElementAt(index: number): lark.DisplayObject;
        /**
         * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
         * 通常在即将重新布局子项之前会被调用一次，容器覆盖此方法提前释放已经不可见的子元素。
         * @param startIndex 可视元素起始索引（包括）
         * @param endIndex 可视元素结束索引（包括）
         */
        setVirtualElementIndicesInView(startIndex: number, endIndex: number): void;
        /**
         * 触摸组件的背景透明区域是否可以穿透。设置为true表示可以穿透，反之透明区域也会响应触摸事件。默认 false。
         */
        touchThrough: boolean;
        /**
         * 为此组件定义的视图状态。
         */
        states: State[];
        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        currentState: string;
        /**
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         */
        hasState: (stateName: string) => boolean;
        /**
         * 初始化所有视图状态
         */
        private initializeStates;
        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState;
        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        invalidateState(): void;
        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        protected getCurrentState(): string;
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues;
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含 scale 和 rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan {
    /**
     * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
     * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
     * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
     * Image 控件可以直接替代 Bitmap 在显示列表中使用。
     *
     * @event lark.Event.COMPLETE 当图片加载完成后调度
     */
    class Image extends lark.Bitmap implements UIComponent {
        constructor(source?: string | lark.BitmapData);
        /**
         * 矩形区域，它定义素材对象的九个缩放区域。
         * 注意:此属性仅在fileMode为BitmapFillMode.SCALE时有效。
         */
        private _scale9Grid;
        scale9Grid: lark.Rectangle;
        private _fillMode;
        /**
         * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
         * 设置为 BitmapFillMode.CLIP，位图将在边缘处被截断。
         * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
         * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
         */
        fillMode: string;
        private sourceChanged;
        private _source;
        /**
         * 用于显示位图的数据源。可以为一个网络图片url或BitmapData实例。
         */
        source: string | lark.BitmapData;
        /**
         * 解析source
         */
        private parseSource();
        /**
         * 资源发生改变
         */
        private contentChanged(data, source);
        /**
         * 绘制九宫格位图
         */
        private drawScale9GridImage(context, image, scale9Grid, surfaceWidth?, surfaceHeight?);
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues;
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated(): void;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties(): void;
        /**
         * 测量组件尺寸
         */
        protected measure(): void;
        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout(): void;
        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout: boolean;
        /**
         * 距父级容器离左边距离
         */
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        /**
         * 距父级容器顶部距离
         */
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter: number;
        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth: number;
        /**
         * 相对父级容器高度的百分比
         */
        percentHeight: number;
        /**
         * 外部显式指定的宽度
         */
        explicitWidth: number;
        /**
         * 外部显式指定的高度
         */
        explicitHeight: number;
        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth: number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth: number;
        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight: number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight: number;
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width: number, height: number): void;
        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties(): void;
        /**
         * 验证组件的属性
         */
        validateProperties(): void;
        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize(): void;
        /**
         * 验证组件的尺寸
         */
        validateSize(recursive?: boolean): void;
        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList(): void;
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList(): void;
        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow(): void;
        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth: number, layoutHeight: number): void;
        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x: number, y: number): void;
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds: lark.Rectangle): void;
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds: lark.Rectangle): void;
    }
}
declare module swan {
    /**
     * 水平布局
     */
    class HorizontalLayout extends LinearLayoutBase {
        /**
         * 测量使用真实布局的尺寸
         */
        protected measureReal(): void;
        /**
         * 测量使用虚拟布局的尺寸
         */
        protected measureVirtual(): void;
        /**
         * 更新使用真实布局的显示列表
         */
        protected updateDisplayListReal(width: number, height: number): void;
        /**
         * 更新使用虚拟布局的显示列表
         */
        protected updateDisplayListVirtual(width: number, height: number): void;
        /**
         * 获取指定索引的起始位置
         */
        protected getStartPosition(index: number): number;
        /**
         * 获取指定索引的元素尺寸
         */
        protected getElementSize(index: number): number;
        /**
         * 获取缓存的子对象尺寸总和
         */
        protected getElementTotalSize(): number;
        elementAdded(index: number): void;
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        protected getIndexInView(): boolean;
    }
}
declare module swan {
    /**
     * 垂直布局
     */
    class VerticalLayout extends LinearLayoutBase {
        /**
         * 测量使用真实布局的尺寸
         */
        protected measureReal(): void;
        /**
         * 测量使用虚拟布局的尺寸
         */
        protected measureVirtual(): void;
        /**
         * 更新使用真实布局的显示列表
         */
        protected updateDisplayListReal(width: number, height: number): void;
        /**
         * 更新使用虚拟布局的显示列表
         */
        protected updateDisplayListVirtual(width: number, height: number): void;
        /**
         * 获取指定索引的起始位置
         */
        protected getStartPosition(index: number): number;
        /**
         * 获取指定索引的元素尺寸
         */
        protected getElementSize(index: number): number;
        /**
         * 获取缓存的子对象尺寸总和
         */
        protected getElementTotalSize(): number;
        elementAdded(index: number): void;
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        protected getIndexInView(): boolean;
    }
}
declare module swan {
    /**
     * 项呈示器基类，通常作为List类的项目视图模板。
     */
    class ItemRenderer extends Group implements IItemRenderer {
        constructor();
        private _data;
        /**
         * 要呈示或编辑的数据。
         */
        data: any;
        /**
         * 子类复写此方法以在 data 数据源发生改变时跟新显示列表。
         */
        protected dataChanged(): void;
        private _selected;
        /**
         * 如果项呈示器可以将其自身显示为已选中，则为 true。
         */
        selected: boolean;
        /**
         * 项呈示器的数据提供程序中的项目索引。
         */
        itemIndex: number;
        /**
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
         */
        private touchCaptured;
        /**
         * 鼠标事件处理
         */
        protected onTouchBegin(event: lark.TouchEvent): void;
        /**
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event);
        /**
         * 返回要应用到外观的状态的名称
         */
        protected getCurrentState(): string;
    }
}
declare module swan {
    /**
     * @language en_US
     * The ScrollBarBase class helps to position
     * the portion of data that is displayed when there is too much data
     * to fit in a display area.
     * The ScrollBarBase class displays a pair of viewport and a thumb.
     * viewport is a instance that implements IViewport.
     *
     * @see swan.IViewport
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * <code>ScrollBarBase</code> 滚动条基类，该类帮助在因数据太多而不能在显示区域完全显示时定位显示的数据部分。
     * ScrollBarBase 类显示视区的一部分和一个指示滑块。
     * 视区是一个IViewport接口实现的实例。
     *
     * @see swan.IViewport
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class ScrollBarBase extends Component {
        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个ScrollBarBase实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * [SkinPart] Thumb display object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart]滑块显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        thumb: swan.UIComponent;
        /**
         * @language en_US
         * The viewport controlled by this scrollbar.
         *
         * If a viewport is specified, then changes to its actual size, content
         * size, and scroll position cause the corresponding ScrollBarBase methods to
         * run:
         * <ul>
         *     <li><code>onViewportResize()</code></li>
         *     <li><code>onPropertyChanged()</code></li>
         * </ul><p/>
         *
         * The VScrollBar and HScrollBar classes override these methods to keep their properties in
         * sync with the viewport.
         *
         * @default null
         * @see swan.VScrollBar
         * @see swan.HScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由该滚动条控制的视区。
         *
         * 如果指定了视区，则对其实际大小、内容大小和滚动位置的更改会导致运行相对应的 ScrollBarBase 方法：
         * <ul>
         *     <li><code>onViewportResize()</code></li>
         *     <li><code>onPropertyChanged()</code></li>
         * </ul><p/>
         *
         * VScrollBar 和 HScrollBar 类需要重写这些方法以保证属性与视区的同步。
         *
         * @default null
         * @see swan.VScrollBar
         * @see swan.HScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        viewport: IViewport;
        /**
         * @private
         *
         * @param event
         */
        private onViewportResize(event?);
        /**
         * @language en_US
         * Properties of viewport changed.
         * @param event
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 视区属性发生改变。
         * @param event
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onPropertyChanged(event: swan.PropertyEvent): void;
    }
}
declare module swan {
    /**
     * 按钮组件
     */
    class Button extends Component {
        /**
         * 创建一个按钮实例
         */
        constructor();
        /**
         * [SkinPart]按钮上的文本标签
         */
        labelDisplay: IDisplayText;
        private _label;
        /**
         * 要在按钮上显示的文本
         */
        label: string;
        /**
         * [SkinPart]按钮上的图标显示对象。
         */
        iconDisplay: Image;
        private _icon;
        /**
         * 要在按钮上显示的图标数据
         */
        icon: string | lark.BitmapData;
        /**
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，是否按下鼠标以及触摸点是否在按钮上。
         */
        private touchCaptured;
        /**
         * 鼠标事件处理
         */
        protected onTouchBegin(event: lark.TouchEvent): void;
        /**
         * 舞台上触摸弹起事件
         */
        private onStageTouchEnd(event);
        /**
         * 返回要应用到外观的状态的名称
         */
        protected getCurrentState(): string;
        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        protected partAdded(partName: string, instance: any): void;
        /**
         * 按钮弹起事件
         */
        protected buttonReleased(): void;
    }
}
declare module swan {
    /**
     * DataGroup 是数据容器基类,将数据项目转换为可视元素以进行显示
     */
    class DataGroup extends Group {
        constructor();
        /**
         * 是否使用虚拟布局,默认true
         */
        useVirtualLayout: boolean;
        /**
         * 是否使用虚拟布局标记改变
         */
        private onUseVirtualLayoutChanged(event?);
        setVirtualElementIndicesInView(startIndex: number, endIndex: number): void;
        getElementAt(index: number): lark.DisplayObject;
        /**
         * 释放指定索引处的项呈示器
         */
        private freeRendererByIndex(index);
        private doFreeRenderer(renderer);
        /**
         * 标记组件，以便在稍后屏幕更新期间调用该组件的 measure() 方法
         */
        invalidateSize(): void;
        /**
         * 为指定索引创建虚拟的项呈示器
         */
        private createVirtualRenderer(item);
        /**
         * 根据rendererClass创建一个Renderer,并添加到显示列表
         */
        private createOneRenderer(rendererClass);
        /**
         * 列表数据源，请使用实现了ICollection接口的数据类型，例如 ArrayCollection
         */
        dataProvider: ICollection;
        /**
         * 移除数据源监听
         */
        private removeDataProviderListener();
        /**
         * 数据源改变事件处理
         */
        protected onCollectionChange(event: CollectionEvent): void;
        /**
         * 数据源添加项目事件处理
         */
        private itemAddedHandler(items, index);
        /**
         * 数据源移除项目事件处理
         */
        private itemRemovedHandler(items, location);
        /**
         * 添加一项
         */
        protected itemAdded(item: any, index: number): void;
        /**
         * 移除一项
         */
        protected itemRemoved(item: any, index: number): void;
        /**
         * 更新当前所有项的索引
         */
        private resetRenderersIndices();
        /**
         * 数据源更新或替换项目事件处理
         */
        private itemUpdatedHandler(item, location);
        /**
         * 调整指定项呈示器的索引值
         */
        private resetRendererItemIndex(index);
        /**
         * 用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口。<br/>
         * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
         */
        itemRenderer: any;
        /**
         * 为某个特定数据项返回一个项呈示器类定义的函数。
         * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
         */
        itemRendererFunction: (item: any) => any;
        /**
         * 为特定的数据项返回项呈示器的工厂实例
         */
        private itemToRendererClass(item);
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren(): void;
        /**
         * 处理对组件设置的属性
         */
        protected commitProperties(): void;
        /**
         * 计算组件的默认大小和（可选）默认最小大小
         */
        protected measure(): void;
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        /**
         * 确保测量过默认条目大小。
         */
        private ensureTypicalLayoutElement();
        /**
         * 测量项呈示器默认尺寸
         */
        private measureRendererSize();
        /**
         * 设置项目默认大小
         */
        private setTypicalLayoutRect(rect);
        /**
         * 移除所有项呈示器
         */
        private removeAllRenderers();
        /**
         * 为数据项创建项呈示器
         */
        private createRenderers();
        /**
         * 更新项呈示器
         */
        updateRenderer(renderer: IItemRenderer, itemIndex: number, data: any): IItemRenderer;
        /**
         * 获得对象容器的子对象总数
         */
        numElements: number;
        /**
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererAdded(renderer: IItemRenderer, index: number, item: any): void;
        /**
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         */
        protected rendererRemoved(renderer: IItemRenderer, index: number, item: any): void;
    }
}
declare module swan {
    /**
     * 带有标题，关闭按钮，可移动区域的面板组件。注意：当第一次通过触摸交互操作移动面板时，面板的 includeInLayout 属性将会自动被设置为false，
     * 以确保移动不会受到自动布局属性的影响。若之后还需要启用面板在父级容器中的自动布局，需手动设置 includeInLayout 为 true。
     * @event swan.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，监听此事件并调用event.preventDefault()能够阻止面板被关闭。
     */
    class Panel extends Component {
        /**
         * 创建一个Panel实例
         */
        constructor();
        /**
         * 在窗体上按下时前置窗口
         */
        private onWindowMouseDown(event);
        /**
         * [SkinPart]关闭按钮
         */
        closeButton: Button;
        /**
         * [SkinPart]可移动区域
         */
        moveArea: lark.DisplayObject;
        /**
         * [SkinPart]标题显示对象
         */
        titleDisplay: IDisplayText;
        private _title;
        /**
         * 标题文本内容
         */
        title: string;
        protected partAdded(partName: string, instance: any): void;
        protected partRemoved(partName: string, instance: any): void;
        /**
         * 关闭按钮被点击事件
         */
        protected onCloseButtonClick(event: lark.TouchEvent): void;
        /**
         * 关闭面板，从父级容器移除自身。
         */
        close(): void;
        /**
         * 鼠标按下时的偏移量
         */
        private offsetPointX;
        private offsetPointY;
        /**
         * 在可移动区域按下
         */
        protected onTouchBegin(event: lark.TouchEvent): void;
        /**
         * 触摸拖拽时的移动事件
         */
        onTouchMove(event: lark.TouchEvent): void;
        /**
         * 鼠标在舞台上弹起事件
         */
        onTouchEnd(event: lark.TouchEvent): void;
    }
}
declare module swan.sys {
}
declare module swan {
    /**
     * @language en_US
     * The Range class holds a value and an allowed range for that
     * value, defined by <code>minimum</code> and <code>maximum</code> properties.
     *
     * The <code>value</code> property
     * is always constrained to be between the current <code>minimum</code> and
     * <code>maximum</code>, and the <code>minimum</code>,
     * and <code>maximum</code> are always constrained
     * to be in the proper numerical order, such that
     * <code>(minimum <= value <= maximum)</code> is <code>true</code>.
     *
     * If the value of the <code>snapInterval</code> property is not 0,
     * then the <code>value</code> property is also constrained to be a multiple of
     * <code>snapInterval</code>.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
     *
     * <code>value</code>属性的值永远被限制于当前的<code>minimum</code>和
     * <code>maximum</code>之间，并且<code>minimum</code>和 <code>maximum</code>永远按照固定的书序排列，
     * 即<code>(minimum <= value <= maximum)</code> 为真。
     *
     * 如果<code>snapInterval</code>属性的值不是0，那么<code>value</code>的值也会被<code>snapInterval</code>所约束。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class Range extends Component {
        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Range 实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * The maximum valid <code>value</code>.<p/>
         *
         * Changes to the value property are constrained
         * by <code>commitProperties()</code> to be less than or equal to
         * maximum with the <code>nearestValidValue()</code> method.
         *
         * @default 100
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 最大有效值。<p/>
         *
         * 规定<code>value<code/>属性的值不能够超过的最大值。该修正过程
         * 将在<code>nearestValidValue()</code>方法中进行。
         *
         * @default 100
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        maximum: number;
        /**
         * @language en_US
         * The minimum valid <code>value</code>.<p/>
         *
         * Changes to the value property are constrained
         * by <code>commitProperties()</code> to be greater than or equal to
         * minimum with the <code>nearestValidValue()</code> method.
         *
         * @default 0
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 最小有效值<p/>
         *
         * 规定<code>value<code/>属性的值不能够低于的最小值。该修正过程
         * 将在<code>nearestValidValue()</code>方法中进行。
         *
         * @default 0
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        minimum: number;
        /**
         * @language en_US
         * The current value for this range.<p/>
         *
         * Changes to the value property are constrained
         * by <code>commitProperties()</code> to be greater than or equal to
         * the <code>minimum</code> property, less than or equal to the <code>maximum</code> property, and a
         * multiple of <code>snapInterval</code> with the <code>nearestValidValue()</code>
         * method.
         *
         * @default 0
         * @see #setValue()
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 此范围的当前值。<p/>
         *
         * 改变的<code>value</code>属性将在<code>commitProperties()</code>方法中被<code>minimum</code>属性
         * 和<code>minimum</code>属性所限制。此修正过程将在<code>nearestValidValue()</code>方法中进行。
         *
         * @default 0
         * @see #setValue()
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        value: number;
        /**
         * @language en_US
         * The snapInterval property controls the valid values of the <code>value</code> property.
         *
         * If nonzero, valid values are the sum of the <code>minimum</code> and integer multiples
         * of this property, for all sums that are less than or equal to the <code>maximum</code>.<p/>
         *
         * For example, if <code>minimum</code> is 10, <code>maximum</code> is 20, and this property is 3, then the
         * valid values of this Range are 10, 13, 16, 19, and 20.<p/>
         *
         * If the value of this property is zero, then valid values are only constrained
         * to be between minimum and maximum inclusive.
         *
         * @default 1
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * snapInterval 属性定义 value 属性的有效值。
         * 如果为非零，则有效值为 minimum 与此属性的整数倍数之和，且小于或等于 maximum。</p>
         *
         * 例如，如果 minimum 为 10，maximum 为 20，而此属性为 3，则可能的有效值为 10、13、16、19 和 20.</p>
         *
         * 如果此属性的值为零，则仅会将有效值约束到介于 minimum 和 maximum 之间（包括两者）。
         *
         * @default 1
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        snapInterval: number;
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties(): void;
        /**
         * @private
         * 修正size到最接近snapInterval的整数倍
         */
        private nearestValidSize(size);
        /**
         * @language en_US
         * Returns the sum of the minimum with an integer multiple of <code>interval</code> that's
         * closest to <code>value</code>, unless <code>value</code> is closer to the maximum limit,
         * in which case the maximum is returned.<p/>
         *
         * If <code>interval</code> is equal to 0, the value is clipped to the minimum and maximum
         * limits.<p/>
         *
         * The valid values for a range are defined by the sum of the <code>minimum</code> property
         * with multiples of the <code>interval</code> and also defined to be less than or equal to the
         * <code>maximum</code> property.
         * The maximum need not be a multiple of <code>snapInterval</code>.<p/>
         *
         * For example, if <code>minimum</code> is equal to 1, <code>maximum</code> is equal to 6,
         * and <code>snapInterval</code> is equal to 2, the valid
         * values for the Range are 1, 3, 5, 6.
         *
         * Similarly, if <code>minimum</code> is equal to 2, <code>maximum</code> is equal to 9,
         * and <code>snapInterval</code> is equal to 1.5, the valid
         * values for the Range are 2, 3.5, 5, 6.5, 8, and 9.
         *
         * @param value The input value.
         * @param interval The value of snapInterval or an integer multiple of snapInterval.
         * @return The valid value that's closest to the input.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回 <code>minimum</code> 与最接近 <code>value</code> 的 <code>interval</code> 的整数倍数之和，
         * 除非 <code>value</code> 接近最大值限制的时候会返回 maximum。<p/>
         *
         * 如果 <code>interval</code> 等于 0，则会将该值剪裁到限制的最小值和最大值。<p/>
         *
         * 范围的有效值由 <code>minimum</code> 属性与 <code>interval</code> 的倍数之和决定，
         * 与此同时也要小于等于 <code>maximum</code> 属性。
         * 最大值不能是 <code>snapInterval</code> 属性的倍数。<p/>
         *
         * 例如，如果 <code>minimum</code> 等于 1，<code>maximum</code> 等于 6，且 <code>snapInterval</code> 等于 3，
         * 则 Range 的有效值有 1、2、5、6。
         *
         * 类似地，如果 <code>minimum</code> 等于 2，<code>maximum</code> 等于 9，
         * 且 <code>snapInterval</code> 等于 1.5，则 Range 的有效值有 2、3.5、5、6.5、8 和 9。
         *
         *
         * @param value 输入值。
         * @param interval snapInterval 的值，或 snapInterval 的整数倍数。
         * @return 最近接输入值的有效值。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected nearestValidValue(value: number, interval: number): number;
        /**
         * @language en_US
         * Sets the current value for the <code>value</code> property.<p/>
         *
         * This method assumes that the caller has already used the <code>nearestValidValue()</code> method
         * to constrain the value parameter
         *
         * @param value The new value of the <code>value</code> property.
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置当前值。<p/>
         *
         * 此方法假定调用者已经使用了 nearestValidValue() 方法来约束 value 参数。
         *
         * @param value value属性的新值
         * @see #nearestValidValue()
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setValue(value: number): void;
        /**
         * @language en_US
         * Draws the object and/or sizes and positions its children.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制对象和/或设置其子项的大小和位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(w: number, h: number): void;
        /**
         * @language en_US
         * Update size and visible of skin parts.<p/>
         * Subclasses override this method to update skin parts display based on <code>minimum</code>, <code>maximum</code>
         * and <code>value</code> properties.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新皮肤部件（通常为滑块）的大小和可见性。<p/>
         * 子类覆盖此方法以基于 minimum、maximum 和 value 属性更新滑块的大小、位置和可见性。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateSkinDisplayList(): void;
    }
}
declare module swan {
    /**
     * 层级堆叠容器,一次只显示一个子对象。
     */
    class ViewStack extends Group implements ICollection {
        /**
         * 创建一个ViewStack实例
         */
        constructor();
        /**
         * 此容器的布局对象为只读,默认限制为BasicLayout。
         */
        layout: LayoutBase;
        private _selectedChild;
        /**
         * 当前选中的子项
         */
        selectedChild: lark.DisplayObject;
        /**
         * 在属性提交前缓存选中项索引
         */
        private proposedSelectedIndex;
        _selectedIndex: number;
        /**
         * 当前选中子项的索引
         */
        selectedIndex: number;
        /**
         * 设置选中项索引
         */
        private setSelectedIndex(value);
        /**
         * 处理对组件设置的属性
         */
        protected commitProperties(): void;
        private commitSelection(newIndex);
        private showOrHide(child, visible);
        /**
         * 子项数量
         */
        length: number;
        getItemAt(index: number): any;
        getItemIndex(item: any): number;
    }
}
declare module swan {
    /**
     * 滚动条组件
     *
     * @event swan.UIEvent.CHANGE_START 滚动位置改变开始
     * @event swan.UIEvent.CHANGE_END 滚动位置改变结束
     */
    class Scroller extends Component {
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。默认值：5 。
         */
        static scrollThreshold: number;
        /**
         * 创建一个 Scroller 实例
         */
        constructor();
        /**
         * [SkinPart] 水平滚动条
         */
        horizontalScrollBar: swan.HScrollBar;
        /**
         * [SkinPart] 垂直滚动条
         */
        verticalScrollBar: swan.VScrollBar;
        /**
         * 垂直方向是否允许滚动的策略，参见 ScrollPolicy 类定义的常量。默认值：ScrollPolicy.AUTO
         */
        scrollPolicyV: string;
        /**
         * 水平方向是否允许滚动的策略，参见ScrollPolicy类定义的常量。默认值：ScrollPolicy.AUTO
         */
        scrollPolicyH: string;
        /**
         * 要滚动的视域组件。
         */
        viewport: IViewport;
        /**
         * 安装并初始化视域组件
         */
        private installViewport();
        /**
         * 卸载视域组件
         */
        private uninstallViewport();
        protected setSkin(skin: Skin): void;
        private onTouchEndCapture(event);
        /**
         * 若这个Scroller可以滚动，阻止当前事件，延迟100ms再抛出。
         */
        private onTouchBeginCapture(event);
        private delayEmitEvent(event);
        private onDelayTouchEventTimer(e?);
        /**
         * 检查当前滚动策略，若有一个方向可以滚动，返回true。
         */
        private checkScrollPolicy();
        private onTouchBegin(event);
        private onTouchMove(event);
        private onTouchEnd(event);
        private horizontalUpdateHandler(scrollPos);
        private verticalUpdateHandler(scrollPos);
        private horizontalEndHandler();
        private verticalEndHanlder();
        private onChangeEnd();
        private onAutoHideTimer(event);
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        protected partAdded(partName: string, instance: any): void;
    }
}
declare module swan {
    /**
     * 进度条控件。
     */
    class ProgressBar extends Range {
        /**
         * 实例化一个进度条控件
         */
        constructor();
        /**
         * [SkinPart]进度高亮显示对象。
         */
        thumb: swan.UIComponent;
        /**
         * [SkinPart]进度条文本
         */
        labelDisplay: Label;
        private _labelFunction;
        /**
         * 进度条文本格式化回调函数。示例：labelFunction(value:Number,maximum:Number):String;
         */
        labelFunction: (value: number, maximum: number) => string;
        /**
         * 将当前value转换成文本
         */
        protected valueToLabel(value: number, maximum: number): string;
        private _slideDuration;
        /**
         * value改变时更新视图的缓动动画时间，单位毫秒。设置为0则不执行缓动。默认值500。
         */
        slideDuration: number;
        private _direction;
        /**
         * 进度条增长方向。请使用 Direction 定义的常量。默认值：Direction.LTR（从左向右增长）。
         */
        direction: string;
        /**
         * 动画实例
         */
        private animation;
        /**
         * 动画播放结束时要到达的value。
         */
        private slideToValue;
        private animationValue;
        /**
         * 动画播放更新数值
         */
        private animationUpdateHandler(animation);
        protected partAdded(partName: string, instance: any): void;
        protected partRemoved(partName: string, instance: any): void;
        /**
         * thumb的位置或尺寸发生改变
         */
        private onThumbResize(event);
        /**
         * 更新皮肤部件大小和可见性。
         */
        protected updateSkinDisplayList(): void;
    }
}
declare module swan {
    /**
     * 垂直滚动条
     */
    class VScrollBar extends ScrollBarBase {
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        protected onPropertyChanged(event: swan.PropertyEvent): void;
    }
}
declare module swan {
    /**
     * 切换按钮
     * @event lark.Event.CHANGE 选中状态发生改变，仅当触摸操作引起的选中状态改变才会抛出此事件。
     */
    class ToggleButton extends Button {
        /**
         * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
         */
        selected: boolean;
        /**
         * 返回要应用到外观的状态的名称
         */
        protected getCurrentState(): string;
        /**
         * 当在用户单击按钮之后处理 MouseEvent.MOUSE_UP 事件时，将调用此方法
         */
        protected buttonReleased(): void;
    }
}
declare module swan {
    const enum Keys {
        clickOffsetX = 0,
        clickOffsetY = 1,
        moveStageX = 2,
        moveStageY = 3,
        touchDownTarget = 4,
        animation = 5,
        slideDuration = 6,
        pendingValue = 7,
        slideToValue = 8,
        liveDragging = 9,
    }
    /**
     * @language en_US
     * The SliderBase class lets users select a value by moving a slider thumb between
     * the end points of the slider track.
     * The current value of the slider is determined by the relative location of
     * the thumb between the end points of the slider,
     * corresponding to the slider's minimum and maximum values.
     * The SliderBase class is a base class for HSlider and VSlider.
     *
     * @see swan.HSlider
     * @see swan.VSlider
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 滑块控件基类，通过使用 SliderBase 类，用户可以在滑块轨道的端点之间移动滑块来选择值。
     * 滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。
     * SliderBase 类是 HSlider 和 VSlider 的基类。
     *
     * @see swan.HSlider
     * @see swan.VSlider
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class SliderBase extends Range {
        /**
         * @language en_US
         * Constructor
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 SliderBase 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * [SkinPart] Highlight of track
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart] 轨道高亮显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        trackHighlight: lark.DisplayObject;
        /**
         * @language en_US
         * [SkinPart] Thumb display object
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart]滑块显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        thumb: swan.UIComponent;
        /**
         * @language en_US
         * [SkinPart] Track display object
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [SkinPart]轨道显示对象
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        track: swan.UIComponent;
        /**
         * @language en_US
         * Duration in milliseconds for the sliding animation when you tap on the track to move a thumb.
         *
         * @default 300
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在轨道上单击以移动滑块时，滑动动画持续的时间（以毫秒为单位）。设置为0将不执行缓动。
         *
         * @default 300
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        slideDuration: number;
        /**
         * @language en_US
         * Converts a track-relative x,y pixel location into a value between
         * the minimum and maximum, inclusive.
         *
         * @param x The x coordinate of the location relative to the track's origin.
         * @param y The y coordinate of the location relative to the track's origin.
         * @return A value between the minimum and maximum, inclusive.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值。
         *
         * @param x 相对于轨道原点的位置的x坐标。
         * @param y 相对于轨道原点的位置的y坐标。
         * @return 介于最小值和最大值（包括两者）之间的一个值。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected pointToValue(x: number, y: number): number;
        /**
         * @language en_US
         * Specifies whether live dragging is enabled for the slider. If true, sets the value
         * and values properties and dispatches the change event continuously as
         * the user moves the thumb.
         *
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
         *
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        liveDragging: boolean;
        /**
         * @language en_US
         * The value the slider will have when the mouse button is released.
         * This property is updated when the slider thumb moves, even if <code>liveDragging</code> is false.<p/>
         * If the <code>liveDragging</code> style is false, then the slider's value is only set
         * when the mouse button is released.
         *
         * @default 0
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放鼠标按键时滑块将具有的值。
         * 无论 liveDragging 是否为 true，在滑块拖动期间始终更新此属性。
         * 而 value 属性在当 liveDragging 为 false 时，只在鼠标释放时更新一次。
         *
         * @default 0
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        pendingValue: number;
        /**
         * @language en_US
         * Sets the backing store for the <code>value</code> property and
         * dispatches a <code>valueCommit</code> event if the property changes.
         *
         * @param value The new value of the <code>value</code> property.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在 value 属性改变时为该属性设置后备存储，并调度 valueCommit 事件。
         *
         * @param value The new value of the <code>value</code> property.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setValue(value: number): void;
        /**
         * @inheritDoc
         */
        protected partAdded(partName: string, instance: any): void;
        /**
         * @inheritDoc
         */
        protected partRemoved(partName: string, instance: any): void;
        /**
         * @private
         * 滑块或轨道尺寸改变事件
         */
        private onTrackOrThumbResize(event);
        /**
         * @language en_US
         * Handle touch-begin events on the scroll thumb. Records the touch begin point in clickOffset.
         *
         * @param The <code>lark.TouchEvent</code> object.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 滑块触摸开始事件，记录触碰开始的坐标偏移量。
         *
         * @param event 事件 <code>lark.TouchEvent</code> 的对象.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onThumbTouchBegin(event: lark.TouchEvent): void;
        /**
         * @private
         * 舞台上触摸移动事件
         */
        private onStageTouchMove(event);
        /**
         * @language en_US
         * Capture touch-move events anywhere on or off the stage.
         * @param newValue new value
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 监听舞台的触碰移动事件。
         * @param newValue 新的值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateWhenTouchMove(newValue: number): void;
        /**
         * @language en_US
         * Handle mouse-up events anywhere on or off the stage.
         *
         * @param The <code>lark.Event</code> object.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 触摸结束事件
         *
         * @param event 事件 <code>lark.Event</code> 的对象。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onStageTouchEnd(event: lark.Event): void;
        /**
         * @private
         * 当在组件上按下时记录被按下的子显示对象
         */
        private onTouchBegin(event);
        /**
         * @private
         * 当结束时，若不是在 touchDownTarget 上弹起，而是另外的子显示对象上弹起时，额外抛出一个触摸单击事件。
         */
        private stageTouchEndHandler(event);
        /**
         * @private
         * 动画播放完毕
         */
        private animationEndHandler(animation);
        /**
         * @private
         * 停止播放动画
         */
        private stopAnimation();
        /**
         * @language en_US
         * Handle touch-begin events for the slider track. We
         * calculate the value based on the new position and then
         * move the thumb to the correct location as well as
         * commit the value.
         * @param The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 轨道的触碰开始事件。我们会在这里根据新的坐标位置计算value，然后移动滑块到当前位置。
         *
         * @param event 事件 <code>lark.TouchEvent</code> 的对象.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onTrackTouchBegin(event: lark.TouchEvent): void;
    }
}
declare module swan.sys {
}
declare module swan {
    /**
     * @language en_US
     * The ListBase class is the base class for list component.
     * It can display items of list as vertical or horizontal such as SELECT of HTML.
     * @event lark.Event.CHANGE Dispatched after the selection has changed.
     * This event is dispatched when the user interacts with the control.
     * @event lark.Event.CHANGING Dispatched when the selection is going to change.
     * Calling the <code>preventDefault()</code> method
     * on the event prevents the selection from changing.<p/>
     * This event is dispatched when the user interacts with the control.
     * @event swan.ItemTapEvent.ITEM_TAP Dispatched when the user tap an item in the control.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * ListBase 是列表控件基类。可显示垂直或水平的项目列表。其功能与 HTML 中的 SELECT 表单元素的功能相似。
     * @event lark.Event.CHANGE 选中的索引已经发生改变,注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event lark.Event.CHANGING 选中的索引即将发生改变，可以通过调用事件对象的 preventDefault() 方法来阻止改变。<p/>
     * 注意：此事件仅在索引改变是由用户触摸操作引起时才抛出。
     * @event swan.ItemTapEvent.ITEM_TAP 项呈示器单击事件。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    class ListBase extends DataGroup {
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * Static constant representing the value "no selection".
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 未选中任何项时的索引值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        static NO_SELECTION: number;
        /**
         * @language en_US
         * Static constant representing no proposed selection.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 未设置缓存选中项的值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        static NO_PROPOSED_SELECTION: number;
        /**
         * @language en_US
         * If <code>true</code>, a data item must always be selected in the control.
         * If the value is <code>true</code>, the <code>selectedIndex</code> property
         * is always set to a value between 0 and (<code>dataProvider.length</code> - 1).
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果为 true，则控件中必须含有选中的数据项目。
         * 如果该值为 true，则始终将 selectedIndex 属性设置为 0 和 (dataProvider.length - 1) 之间的一个值。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        requireSelection: boolean;
        /**
         * @language en_US
         * he 0-based index of the selected item, or -1 if no item is selected.
         * Setting the <code>selectedIndex</code> property deselects the currently selected
         * item and selects the data item at the specified index.<p/>
         *
         * The value is always between -1 and (<code>dataProvider.length</code> - 1).
         * If items at a lower index than <code>selectedIndex</code> are
         * removed from the component, the selected index is adjusted downward
         * accordingly. <p/>
         *
         * If the selected item is removed, the selected index is set to:<p/>
         *
         * <ul>
         *   <li>-1 if <code>requireSelection == false</code> or there are no remaining items.</li>
         *   <li>0 if <code>requireSelection == true</code> and there is at least one item.</li>
         * </ul><p/>
         *
         * When the user changes the <code>selectedIndex</code> property by interacting with the control,
         * the control dispatches the <code>change</code> and <code>changing</code> events.
         * When you change the value of the <code>selectedIndex</code> property programmatically,
         * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
         *
         * @default -1
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 选中项目的基于 0 的索引。
         * 或者如果未选中项目，则为-1。设置 selectedIndex 属性会取消选择当前选定的项目并选择指定索引位置的数据项目。<p/>
         *
         * 这个值会之中在-1到<code>(dataProvider.length - 1)</code>之间。如果从该组件中删除一个低于
         * <code>selectedIndex</code>的值，则<code>selectedIndex</code>也会相应的调节选定的索引。<p/>
         *
         * 如果删除的项为当前选中项，则该值会变为：<p/>
         *
         * <ul>
         *    <li>-1: 如果 <code>requireSelection == false</code> 或者已经没有剩余项目。</li>
         *    <li> 0: 如果 <code>requireSelection == true</code> 并且当前至少还有一个剩余项目。</li>
         * </ul><p/>
         * 当用户通过与控件交互来更改 selectedIndex 属性时，此控件将分派 change 和 changing 事件。
         * 当以编程方式更改 selectedIndex 属性的值时，此控件不分派 change 和 changing 事件。
         *
         * @default -1
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        selectedIndex: number;
        /**
         * @language en_US
         * Used internally to specify whether the selectedIndex changed programmatically or due to
         * user interaction.
         * @param value the new index need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * value has changed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由程序或者用户设置选中项。
         * @param value 索引值。
         * @param dispatchChangeEvent 当索引值发生改变，且该参数为true的时候，组件派发出一个“change”事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setSelectedIndex(value: number, dispatchChangeEvent?: boolean): void;
        /**
         * @language en_US
         * The item that is currently selected.
         * Setting this property deselects the currently selected
         * item and selects the newly specified item.<p/>
         *
         * Setting <code>selectedItem</code> to an item that is not
         * in this component results in no selection,
         * and <code>selectedItem</code> being set to <code>undefined</code>.<p/>
         *
         * If the selected item is removed, the selected item is set to:<p/>
         * <ul>
         *   <li><code>undefined</code> if <code>requireSelection == false</code>
         *     or there are no remaining items.</li>
         *   <li>The first item if <code>requireSelection</code> = <code>true</code>
         *     and there is at least one item.</li>
         * </ul><p/>
         *
         * When the user changes the <code>selectedItem</code> property by interacting with the control,
         * the control dispatches the <code>change</code> and <code>changing</code> events.
         * When you change the value of the <code>selectedIndex</code> property programmatically,
         * it does not dispatches the <code>change</code> and <code>changing</code> events.</p>
         *
         * @default undefined
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前已选中的项目。设置此属性会取消选中当前选定的项目并选择新指定的项目。<p/>
         *
         * 如果设置的<code>selectedItem</code>不在当前列表里那么<code>selectedItem</code>将被设置
         * 为<code>undefined</code>。<p/>
         *
         * 如果选择项目被移除，那选择项会被设置为：<p/>
         * <ul>
         *   <li><code>undefined</code>: 如果 <code>requireSelection == false</code>
         *     或者已经没有剩余项。</li>
         *   <li>第一项: 当 <code>requireSelection == true</code>
         *     并且列表中还至少存有一项.</li>
         * </ul><p/>
         *
         * 当用户通过与控件交互来更改 selectedItem 属性时，此控件将分派 change 和 changing 事件。
         * 当以编程方式更改 selectedItem 属性的值时，此控件不分派 change 和 changing 事件。<p/>
         *
         * @default undefined
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        selectedItem: any;
        /**
         * @language en_US
         * Used internally to specify whether the selectedItem changed programmatically or due to
         * user interaction.
         * @param value the new item need to select.
         * @param dispatchChangeEvent if true, the component will dispatch a "change" event if the
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由程序或用户设置选中项数据源。
         * @param value 要选中的项。
         * @param dispatchChangeEvent 当索引值发生改变，且该参数为true的时候，组件派发出一个“change”事件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setSelectedItem(value: any, dispatchChangeEvent?: boolean): void;
        /**
         * @language en_US
         * Processes the properties set on the component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties(): void;
        /**
         * @language en_US
         * Updates an item renderer for use or reuse.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新项呈示器，以备使用或重用
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        updateRenderer(renderer: IItemRenderer, itemIndex: number, data: any): IItemRenderer;
        /**
         * @language en_US
         * Called when an item is selected or deselected.
         * Subclasses must override this method to display the selection.
         * @param index The item index that was selected.
         * @param selected <code>true</code> if the item is selected,
         * and <code>false</code> if it is deselected.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 选中或取消选中项目时调用。子类必须覆盖此方法才可设置选中项。
         * @param index 已选中的项目索引。
         * @param selected <code>true</code>为选中，<code>false</code>取消选中
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected itemSelected(index: number, selected: boolean): void;
        /**
         * @language en_US
         * The selection validation and commitment workhorse method.
         * Called to commit the pending selected index. This method dispatches
         * the "changing" event, and if the event is not cancelled,
         * commits the selection change and then dispatches the "change"
         * event.
         * @param dispatchChangedEvents if dispatch a "changed" event.
         * @return true if the selection was committed, or false if the selection
         * was cancelled.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 提交选中项属性。该方法会派发一个“changing”事件，如果该事件没有被阻止，
         * 该方法将会提交选择项病根据参数派发“change”事件。
         * @param dispatchChangedEvents 是否派发一个“changed”事件。
         * @return true 表示提交成功, false表示被取消
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitSelection(dispatchChangedEvents?: boolean): boolean;
        /**
         * @language en_US
         * Adjusts the selected index to account for items being added to or
         * removed from this component.
         * It does not dispatch a <code>change</code> event because the change did not
         * occur as a direct result of user-interaction.  Moreover,
         * it does not dispatch a <code>changing</code> event
         * or allow the cancellation of the selection.
         * It also does not call the <code>itemSelected()</code> method,
         * since the same item is selected;
         * @param newIndex The new index.
         * @param add <code>true</code> if an item was added to the component,
         *  and <code>false</code> if an item was removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 仅调整选中索引值而不更新选中项,即在提交属性阶段itemSelected方法不会被调用，也不会触发changing和change事件。
         * @param newIndex 新索引。
         * @param add 如果已将项目添加到组件，则为<code>true</code>；如果已删除项目，则为<code>false</code>。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected adjustSelection(newIndex: number, add?: boolean): void;
        /**
         * @language en_US
         * Called when an item has been added to this component. Selection
         * and caret related properties are adjusted accordingly.
         * @param item The item being added.
         * @param index The index of the item being added.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据项添加
         * @param item 被添加的项。
         * @param index 被添加的项的索引。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected itemAdded(item: any, index: number): void;
        /**
         * @language en_US
         * Called when an item has been removed from this component.
         * Selection and caret related properties are adjusted
         * accordingly.
         * @param item The item being removed.
         * @param index The index of the item being removed.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据项移除
         * @param item 被移除的项。
         * @param index 被移除的项的索引。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected itemRemoved(item: any, index: number): void;
        /**
         * @language en_US
         * Event Listener of source data changed.
         * @param The <code>lark.CollectionEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源改变事件处理。
         * @param event 事件 <code>lark.CollectionEvent</code> 的对象.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onCollectionChange(event: CollectionEvent): void;
        /**
         * @language en_US
         * Default response to dataProvider refresh events: clear the selection and caret.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 数据源刷新
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected dataProviderRefreshed(): void;
        /**
         * @language en_US
         * Called when an item has been added to this component.
         * @param renderer the renderer being added.
         * @param index the index of renderer
         * @param item the data of renderer
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 项呈示器被添加
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected rendererAdded(renderer: IItemRenderer, index: number, item: any): void;
        /**
         * @language en_US
         * Called when an item has been removed to this component.
         * @param renderer the renderer being removed.
         * @param index the index of renderer.
         * @param item the data of renderer.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 项呈示器被移除
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected rendererRemoved(renderer: IItemRenderer, index: number, item: any): void;
        /**
         * @language en_US
         * Handles <code>lark.TouchEvent.TOUCH_BEGIN</code> events from any of the
         * item renderers. This method handles <code>lark.TouchEvent.TOUCH_END</code>.
         * @param event The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 侦听项呈示器<code>lark.TouchEvent.TOUCH_BEGIN</code>事件的方法。同时会添加对舞台<code>lark.TouchEvent.TOUCH_END</code>
         * 事件的侦听。
         * @param event 事件<code>lark.TouchEvent</code>的对象。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onRendererTouchBegin(event: lark.TouchEvent): void;
        /**
         * @language en_US
         * Handles <code>lark.TouchEvent.TOUCH_END</code> events and dispatch <code>ItemTapEvent.ITEM_TAP</code> event.
         * @param event The <code>lark.TouchEvent</code> object.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 鼠标在项呈示器上弹起，抛出<code>ItemTapEvent.ITEM_TAP</code>事件。
         * @param event 事件<code>lark.TouchEvent</code>的对象。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected onRendererTouchEnd(event: lark.TouchEvent): void;
        /**
         * @private
         * 鼠标在舞台上弹起
         */
        private stage_touchEndHandler(event);
    }
}
declare module swan {
    /**
     * 水平滚动条
     */
    class HScrollBar extends ScrollBarBase {
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        protected onPropertyChanged(event: swan.PropertyEvent): void;
    }
}
declare module swan {
    /**
     * 复选框
     */
    class CheckBox extends ToggleButton {
        /**
         * 创建一个CheckBox
         */
        constructor();
    }
}
declare module swan {
    /**
     * 开关按钮
     */
    class ToggleSwitch extends ToggleButton {
        /**
         * 创建一个ToggleSwitch
         */
        constructor();
    }
}
declare module swan {
    /**
     * List 控件可显示垂直或水平的项目列表。您可以通过设置 allowMultipleSelection 属性为true来允许同时选中多项。
     */
    class List extends ListBase {
        /**
         * 是否允许同时选中多项,设置为true时，触摸按下未选中的项呈示器，将会设置该项选中，再次按下将会取消选中。可以设置多项为选中状态。
         */
        allowMultipleSelection: boolean;
        private _selectedIndices;
        private _proposedSelectedIndices;
        /**
         * 当前选中的一个或多个项目的索引列表
         */
        selectedIndices: number[];
        selectedIndex: number;
        /**
         * 当前选中的一个或多个项目的数据源列表
         */
        selectedItems: any[];
        /**
         * 设置多个选中项
         */
        protected setSelectedIndices(value: number[], dispatchChangeEvent?: boolean): void;
        /**
         * 处理对组件设置的属性
         */
        protected commitProperties(): void;
        protected commitSelection(dispatchChangedEvents?: boolean): boolean;
        /**
         * 是否是有效的索引
         */
        private isValidIndex;
        /**
         * 提交多项选中项属性
         */
        protected commitMultipleSelection(): void;
        /**
         * 数据源发生刷新
         */
        dataProviderRefreshed(): void;
        /**
         * 计算当前的选中项列表
         */
        private calculateSelectedIndices(index);
        /**
         * 鼠标在项呈示器上弹起，抛出ItemClick事件。
         */
        protected onRendererTouchEnd(event: lark.TouchEvent): void;
    }
}
declare module swan {
    /**
     * 水平滑块控件
     */
    class HSlider extends SliderBase {
        /**
         * 创建一个水平滑块控件
         */
        constructor();
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
         */
        protected pointToValue(x: number, y: number): number;
        private getThumbRange();
        /**
         * 设置外观部件的边界，这些外观部件的几何图形不是完全由外观的布局指定的
         */
        protected updateSkinDisplayList(): void;
    }
}
declare module swan {
    /**
     * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
     */
    class RadioButton extends ToggleButton {
        /**
         * 创建一个RadioButton
         */
        constructor();
        /**
         * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮
         */
        enabled: boolean;
        private _group;
        /**
         * 此单选按钮所属的组。同一个组的多个单选按钮之间互斥。
         * 若不设置此属性，则根据groupName属性自动创建一个唯一的RadioButtonGroup。
         */
        group: RadioButtonGroup;
        private groupChanged;
        private _groupName;
        /**
         * 所属组的名称,具有相同组名的多个单选按钮之间互斥。默认值:"radioGroup"。
         * 可以把此属性当做设置组的一个简便方式，作用与设置group属性相同,。
         */
        groupName: string;
        private _value;
        /**
         * 与此单选按钮关联的自定义数据。
         */
        value: any;
        protected commitProperties(): void;
        protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
        protected buttonReleased(): void;
        /**
         * 添此单选按钮加到组
         */
        private addToGroup();
    }
}
declare module swan {
    /**
     * 垂直滑块控件
     */
    class VSlider extends SliderBase {
        /**
         * 创建一个垂直滑块控件
         */
        constructor();
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值
         */
        protected pointToValue(x: number, y: number): number;
        private getThumbRange();
        /**
         * 设置外观部件（通常为滑块）的边界，这些外观部件的几何图形不是完全由外观的布局指定的
         */
        updateSkinDisplayList(): void;
    }
}
declare module swan {
    /**
     * 选项卡组件
     */
    class TabBar extends ListBase {
        constructor();
        protected createChildren(): void;
        private indexBeingUpdated;
        /**
         * 鼠标点击的选中项改变
         */
        private onIndexChanged(event);
        /**
         * ViewStack选中项发生改变
         */
        private onViewStackIndexChange(event);
    }
}
declare module swan {
    /**
     * 为 Swan 内的类或接口定义的枚举值。通常作为实例检查类型 lark.is() 方法的参数。
     */
    const enum Types {
        /**
         * UI 显示对象基类
         */
        UIComponent = 1001,
        /**
         * UI 容器基类
         */
        Group = 1002,
        /**
         * DataGroup 是数据容器基类,将数据项目转换为可视元素以进行显示
         */
        DataGroup = 1003,
        /**
         * 数据项目的容器基类,将数据项目转换为可视元素以进行显示。
         */
        ListBase = 1004,
        /**
         * 选项卡组件
         */
        TabBar = 1005,
        /**
         * 列表组件
         */
        List = 1006,
        /**
         * 列表类组件的项呈示器接口
         */
        IItemRenderer = 1007,
        /**
         * 项呈示器基类，通常作为List类的项目视图模板。
         */
        ItemRenderer = 1008,
        /**
         * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
         */
        Component = 1009,
        /**
         * Label 是可以呈示一行或多行统一格式文本的UI组件。要显示的文本由 text 属性确定。文本格式由样式属性指定，例如 fontFamily 和 fontSize。
         * 因为 Label 运行速度快且占用内存少，所以它特别适合用于显示多个小型非交互式文本的情况，例如，项呈示器和 Button 外观中的标签。
         * 在 Label 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。
         * 如果没有为 Label 指定宽度，则由这些显式换行符确定的最长行确定 Label 的宽度。
         * 如果指定了宽度，则指定文本将在组件边界的右边缘换行，如果文本扩展到低于组件底部，则将被剪切。
         */
        Label = 1010,
        /**
         * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
         * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
         * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
         * Image 控件可以直接替代 Bitmap 在显示列表中使用。
         *
         * @event lark.Event.COMPLETE 当图片加载完成后调度
         */
        Image = 1011,
        /**
         * 含有视图状态功能的皮肤基类。
         */
        Skin = 1012,
        /**
         * 皮肤主题。实例化一个主题，能够在运行时修改全局的默认皮肤。
         */
        Theme = 1013,
        /**
         * UI事件
         */
        UIEvent = 1014,
        /**
         * 集合类型数据改变事件
         */
        CollectionEvent = 1015,
        /**
         * 对象的一个属性发生更改时传递到事件侦听器的事件
         */
        PropertyEvent = 1016,
        /**
         * 列表单击事件
         */
        ItemTapEvent = 1017,
        /**
         * 数组的集合类数据结构包装器
         * 通常作为列表组件的数据源，使用这种数据结构包装普通数组，
         * 能在数据源发生改变的时候主动通知视图刷新变更的数据项
         */
        ArrayCollection = 1018,
        /**
         * 容器布局基类。若要创建使用 Group 容器的自定义布局，必须扩展 LayoutBase 或其子类之一。
         * 子类必须实现 updateDisplayList() 方法（定位 target Group 的子项并调整这些子项的大小）和 measure() 方法（计算 target 的默认大小）。
         */
        LayoutBase = 1019,
        /**
         * 线性布局基类，通常作为 HorizontalLayout 和 VerticalLayout 的父类。
         */
        LinearLayoutBase = 1020,
        /**
         * BasicLayout 类根据其各个设置彼此独立地排列布局元素。
         * BasicLayout（也称为绝对布局）要求显式定位每个容器子代。可以使用子代的 x 和 y 属性，或使用约束来定位每个子代。
         */
        BasicLayout = 1021,
        /**
         * 水平布局
         */
        HorizontalLayout = 1022,
        /**
         * 垂直布局
         */
        VerticalLayout = 1023,
        /**
         * 带有标题，关闭按钮，可移动区域的面板组件。注意：当第一次通过触摸交互操作移动面板时，面板的 includeInLayout 属性将会自动被设置为false，
         * 以确保移动不会受到自动布局属性的影响。若之后还需要启用面板在父级容器中的自动布局，需手动设置 includeInLayout 为 true。
         * @event swan.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，监听此事件并调用event.preventDefault()能够阻止面板被关闭。
         */
        Panel = 1024,
        /**
         * 按钮组件
         */
        Button = 1025,
        /**
         * 切换按钮
         */
        ToggleButton = 1026,
        /**
         * 复选框
         */
        CheckBox = 1027,
        /**
         * 开关按钮
         */
        ToggleSwitch = 1028,
        /**
         * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
         */
        RadioButton = 1029,
        /**
         * RadioButtonGroup 组件定义一组 RadioButton 组件，这些组件相互排斥；因此，用户每次只能选择一个 RadioButton 组件
         */
        RadioButtonGroup = 1030,
        /**
         * State 类定义视图状态，即组件的特定视图。
         */
        State = 1031,
        /**
         * IOverride 接口定义视图状态的覆盖操作。State 类 overrides 属性数组中的所有条目均必须实现此接口。
         */
        IOverride = 1032,
        /**
         * 视图添加状态显示元素操作
         */
        AddItems = 1033,
        /**
         * 视图状态设置属性操作
         */
        SetProperty = 1034,
        /**
         * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
         */
        Watcher = 1035,
        /**
         * 层级堆叠容器,一次只显示一个子对象。
         */
        ViewStack = 1036,
        /**
         * 滚动条组件
         */
        Scroller = 1037,
        /**
         * 滚动条基类
         */
        ScrollBarBase = 1038,
        /**
         * 垂直滚动条
         */
        VScrollBar = 1039,
        /**
         * 水平滚动条
         */
        HScrollBar = 1040,
        /**
         * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
         */
        Range = 1041,
        /**
         * 滑块控件基类
         */
        SliderBase = 1042,
        /**
         * 水平滑块
         */
        HSlider = 1043,
        /**
         * 垂直滑块
         */
        VSlider = 1044,
        /**
         * 支持视区的组件接口
         */
        IViewport = 1045,
        /**
         * 网格布局
         */
        TileLayout = 1046,
        /**
         * 可编辑文本
         */
        EditableText = 1047,
    }
}
