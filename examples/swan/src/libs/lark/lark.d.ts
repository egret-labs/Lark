declare module lark {
    /**
     * XML节点基类
     */
    interface XMLNode {
        /**
         * 节点类型，1：XML，2：XMLAttribute，3：XMLText
         */
        nodeType: number;
        /**
         * 节点所属的父级节点
         */
        parent: XML;
    }
    /**
     * XML节点对象
     */
    interface XML extends XMLNode {
        /**
         * 当前节点上的属性列表
         */
        attributes: any;
        /**
         * 当前节点的子节点列表
         */
        children: XMLNode[];
        /**
         * 节点完整名称。例如节点 <e:Button/> 的 name 为：e:Button
         */
        name: string;
        /**
         * 节点的命名空间前缀。例如节点 <e:Button/> 的 prefix 为：e
         */
        prefix: string;
        /**
         * 节点的本地名称。例如节点 <e:Button/> 的 prefix 为：Button
         */
        localName: string;
        /**
         * 节点的命名空间地址。例如节点 <e:Skin xmlns:e="http://ns.egret.com/swan"/> 的 namespace 为： http://ns.egret.com/swan
         */
        namespace: string;
    }
    /**
     * XML文本节点
     */
    interface XMLText extends XMLNode {
        /**
         * 文本内容
         */
        text: string;
    }
    var XML: {
        /**
         * 解析字符串为XML对象
         * @param text 要解析的XML对象。
         */
        parse(text: string): XML;
    };
}
declare module lark {
    /**
     * 判断第一个参数是否为true，若为false则抛出异常并且在console输出相应信息。
     */
    function assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    /**
     * 打印一个警告信息，传入多个参数会输出以空格分隔的字符串。
     */
    function warn(message?: any, ...optionalParams: any[]): void;
    /**
     * 打印一条错误信息,传入多个参数会输出以空格分隔的字符串。
     */
    function error(message?: any, ...optionalParams: any[]): void;
    /**
     * 打印字符串,传入多个参数会输出以空格分隔的字符串。
     */
    function log(message?: any, ...optionalParams: any[]): void;
}
declare module lark {
    class Capabilities {
        /**
         * 指定运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。
         * 以下是可能但不限于的语言和值：
         * 简体中文  zh-CN
         * 繁体中文  zh-TW
         * 英语      en
         * 日语      ja
         * 韩语      ko
         * 法语      fr
         * 捷克语    cs
         * 丹麦语    da
         * 荷兰语    nl
         * 芬兰语    fi
         * 德语      de
         * 匈牙利语   hu
         * 意大利语   it
         * 挪威语    no
         * 其他/未知 xu
         * 波兰语    pl
         * 葡萄牙语  pt
         * 俄语      ru
         * 西班牙语  es
         * 瑞典语    sv
         * 土耳其语  tr
         */
        static language: string;
        static isMobile: boolean;
        static canvas: boolean;
        static audio: IAudioSupport;
        static video: IVideoSupport;
        static webGL: boolean;
        static webAudio: boolean;
        static webSocket: boolean;
        static location: boolean;
        static orientation: boolean;
        static motion: boolean;
    }
    interface IAudioSupport {
        ogg: boolean;
        mp3: boolean;
        wav: boolean;
        m4a: boolean;
        opus: boolean;
    }
    interface IVideoSupport {
        ogg: boolean;
        h264: boolean;
        webm: boolean;
        vp9: boolean;
        hls: boolean;
    }
}
declare module lark {
    var $START_TIME: number;
    /**
     * 用于计算相对时间。此方法返回自启动 Lark 框架以来经过的毫秒数。
     * @returns 启动 Lark 框架以来经过的毫秒数。
     */
    function getTimer(): number;
}
declare module lark.sys {
    /**
     * 平台实现输入文本的接口
     */
    interface ITextAdapter {
    }
}
declare module lark {
    /**
     * 水平对齐方式
     */
    class HorizontalAlign {
        /**
         * 左对齐
         */
        static LEFT: string;
        /**
         * 右对齐
         */
        static RIGHT: string;
        /**
         * 水平居中对齐
         */
        static CENTER: string;
    }
}
declare module lark.sys {
    /**
     * 全局共享的RenderContext。通常用于交换缓存，测量文本或创建填充对象。
     */
    var sharedRenderContext: sys.RenderContext;
    /**
     * surfaceFactory实例
     */
    var surfaceFactory: SurfaceFactory;
    interface SurfaceFactory {
        /**
         * 从对象池取出或创建一个新的Surface实例
         * @param useOnce 表示对取出实例的使用是一次性的，用完后立即会释放。
         */
        create(useOnce?: boolean): Surface;
        /**
         * 释放一个Surface实例
         * @param surface 要释放的Surface实例
         */
        release(surface: Surface): void;
    }
}
declare module lark {
    /**
     * GraphicsGradient 接口表示描述渐变的不透明对象。通过 Graphics.createLinearGradient() 或 Graphics.createRadialGradient() 等静态方法的返回值得到.
     */
    interface GraphicsGradient {
        /**
         * 添加一个由偏移值和颜色值指定的断点到渐变。如果偏移值不在0到1之间，将抛出错误，如果颜色值不能被解析为有效的CSS颜色值 <color>，也将抛出错误。
         * @param offset 0到1之间的值，超出范围将抛出错误
         * @param color CSS颜色值 <color>。如果颜色值不能被解析为有效的CSS颜色值 <color>，将抛出错误。
         */
        addColorStop(offset: number, color: string): void;
    }
}
declare module lark {
    /**
     * GraphicsPattern 接口表示描述一个模板（基于BitmapData）的不透明对象，通过 Graphics.createPattern() 静态方法创建.
     */
    interface GraphicsPattern {
    }
}
declare module lark.sys {
    /**
     * 呈现最终绘图结果的画布
     */
    interface Surface extends BitmapData {
        /**
         * 绘图上下文
         */
        renderContext: RenderContext;
    }
}
declare module lark.sys {
    /**
     * StageScaleMode 类为舞台缩放模式提供值。
     */
    class ScaleMode {
        /**
         * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
         * 在此模式下，舞台尺寸（Stage.stageWidth,Stage.stageHeight）始终跟播放器视口大小保持一致。
         */
        static NO_SCALE: string;
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         */
        static SHOW_ALL: string;
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         */
        static NO_BORDER: string;
        /**
         * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         */
        static EXACT_FIT: string;
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
         * 在此模式下，舞台宽度(Stage.stageWidth)始终等于初始化时外部传入的应用程序内容宽度。舞台高度(Stage.stageHeight)由当前的缩放比例与播放器视口高度决定。
         */
        static FIXED_WIDTH: string;
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
         * 在此模式下，舞台高度(Stage.stageHeight)始终等于初始化时外部传入的应用程序内容高度。舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽度决定。
         */
        static FIXED_HEIGHT: string;
    }
}
declare module lark {
    /**
     * 空数字。通常用于标识一个数值属性未被外部显式设置。例如对 TextField.width 赋值NONE，将会取消之前显式设置的宽度，从而让TextFiled自动测量一个合适的宽度。
     * 框架内不直接使用NaN，是因为isNaN()方法有严重的性能问题。使用 isNone() 来作为显式设置的判断依据能获得非常高的运行性能。
     */
    var NONE: number;
    /**
     * 判断数字是否为NONE
     * @param value 要判断的数字
     */
    function isNone(value: number): boolean;
}
declare module lark.sys {
    /**
     * 绘图上下文
     */
    interface RenderContext {
        surface: Surface;
        globalCompositeOperation: string;
        globalAlpha: number;
        miterLimit: number;
        lineCap: string;
        lineJoin: string;
        lineWidth: number;
        strokeStyle: any;
        fillStyle: any;
        imageSmoothingEnabled: boolean;
        textAlign: string;
        textBaseline: string;
        font: string;
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        lineTo(x: number, y: number): void;
        fill(fillRule?: string): void;
        closePath(): void;
        rect(x: number, y: number, w: number, h: number): void;
        moveTo(x: number, y: number): void;
        fillRect(x: number, y: number, w: number, h: number): void;
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        stroke(): void;
        strokeRect(x: number, y: number, w: number, h: number): void;
        beginPath(): void;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        translate(x: number, y: number): void;
        scale(x: number, y: number): void;
        rotate(angle: number): void;
        restore(): void;
        save(): void;
        clip(fillRule?: string): void;
        clearRect(x: number, y: number, w: number, h: number): void;
        setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): GraphicsGradient;
        createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): GraphicsGradient;
        fillText(text: string, x: number, y: number, maxWidth?: number): void;
        measureText(text: string): TextMetrics;
        /**
         * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
         * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
         */
        drawImage(image: BitmapData, offsetX: number, offsetY: number, width?: number, height?: number, surfaceOffsetX?: number, surfaceOffsetY?: number, surfaceImageWidth?: number, surfaceImageHeight?: number): void;
        createPattern(image: BitmapData, repetition: string): GraphicsPattern;
        getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    }
    interface TextMetrics {
        width: number;
    }
    interface ImageData {
        width: number;
        data: Uint8Array;
        height: number;
    }
}
declare module lark {
    /**
     * BitmapData 对象包含像素数据的数组。此数据可以表示完全不透明的位图，或表示包含 Alpha 通道数据的透明位图。
     * 以上任一类型的 BitmapData 对象都作为 32 位整数的缓冲区进行存储。每个 32 位整数确定位图中单个像素的属性。
     * 每个 32 位整数都是四个 8 位通道值（从 0 到 255）的组合，这些值描述像素的 Alpha 透明度以及红色、绿色、蓝色 (ARGB) 值。
     * （对于 ARGB 值，最高有效字节代表 Alpha 通道值，其后的有效字节分别代表红色、绿色和蓝色通道值。）
     */
    interface BitmapData extends LarkObject {
        width: number;
        height: number;
    }
}
declare module lark.sys {
    interface Renderable extends LarkObject {
    }
}
declare module lark {
    /**
     * 用于文本宽度测量的辅助类
     */
    class TextMeasurer {
        /**
         * 测量文本在指定样式下的宽度
         */
        static measureText(text: string, font: string): number;
    }
}
declare module lark {
    /**
     * EventPhase 可为 Event 类的 eventPhase 属性提供值。
     */
    const enum EventPhase {
        /**
         * 捕获阶段。
         */
        CAPTURING_PHASE = 1,
        /**
         * 冒泡阶段。
         */
        BUBBLING_PHASE = 3,
    }
}
declare module lark {
    /**
     * 垂直对齐方式
     */
    class VerticalAlign {
        /**
         * 顶对齐
         */
        static TOP: string;
        /**
         * 底对齐
         */
        static BOTTOM: string;
        /**
         * 垂直居中对齐
         */
        static MIDDLE: string;
    }
}
declare module lark {
    /**
     * IEventEmitter 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * 事件目标是 Lark 事件模型的重要组成部分。事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击或按键等事件时，
     * 会将事件对象调度到从显示列表根开始的事件流中。事件对象进行到事件目标的往返行程，在概念上，到事件目标的此往返行程被划分为两个阶段：
     * 捕获阶段包括从根到事件目标节点的行程，冒泡阶段与捕获阶段完全相反，从事件目标节点到根的行程。
     * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），
     * 则可以实现 IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的挂钩，将调用连接到聚合的 EventEmitter 中。
     */
    interface IEventEmitter extends LarkObject {
        /**
         * 添加事件侦听器
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听。
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 once() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        once(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 移除事件侦听器
         * @param type 事件名
         * @param listener 侦听函数
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
         */
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        /**
         * 检测是否存在监听器
         * @param type 事件名
         * @returns {*}
         */
        hasListener(type: string): boolean;
        /**
         * 将事件分派到事件流中。事件目标是对其调用 emit() 方法的 EventEmitter 对象。
         * @param event 调度到事件流中的 Event 对象。
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        emit(event: Event): boolean;
        /**
         * 检查是否用此 EventEmitter 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventEmitter 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasListener() 与 willTrigger() 方法的区别是：hasListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件类型
         * @returns 是否注册过监听器，如果注册过返回true，反之返回false
         */
        willTrigger(type: string): boolean;
    }
}
declare module lark {
    /**
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
declare module lark.sys {
    /**
     * 屏幕适配器接口，当播放器视口尺寸改变时，屏幕适配器将被用于计算当前对应的舞台显示尺寸。
     */
    interface IScreenAdapter {
        /**
         * 计算舞台显示尺寸
         * @param scaleMode 当前的缩放模式
         * @param screenWidth 播放器视口宽度
         * @param screenHeight 播放器视口高度
         * @param contentWidth 初始化内容宽度
         * @param contentHeight 初始化内容高度
         */
        calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): StageDisplaySize;
    }
    /**
     * 舞台显示尺寸数据
     */
    interface StageDisplaySize {
        /**
         * 舞台宽度
         */
        stageWidth: number;
        /**
         * 舞台高度
         */
        stageHeight: number;
        /**
         * 显示宽度，若跟舞台宽度不同，将会产生缩放。
         */
        displayWidth: number;
        /**
         * 显示高度，若跟舞台高度不同，将会产生缩放。
         */
        displayHeight: number;
    }
}
declare module lark {
    /**
     * 检查指定对象是否为 Lark 框架内指定接口或类或其子类的实例。此方法与使用 instanceOf 关键字相比具有更高的性能，并且能判断接口的实现。
     * 若要判断对象是否为项目中的自定义类或接口的实例，请使用 lark.registerClass() 方法为自定义类注册运行时信息即可。
     * @param instance 要判断的实例，注意：传入的值必须是实例，而不是类定义。若要判断类定义使用表达式：typeof instance == "function" 即可。
     * @param typeFlag 类或接口的枚举值，请参考 lark.Types 或 swan.Types 定义的枚举常量。
     * @returns 返回true表示当前对象是指定类或接口的实例。
     */
    function is(instance: any, typeFlag: number): boolean;
}
declare module lark {
    /**
     * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
     * @event lark.Event.COMPLETE 加载完成
     * @event lark.Event.IO_ERROR 加载失败
     */
    interface ImageLoader extends EventEmitter {
        /**
         * 使用 load() 方法加载成功的 BitmapData 图像数据。
         */
        data: BitmapData;
        /**
         * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
         * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
         */
        crossOrigin: string;
        /**
         * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
         * @param url 要加载的图像文件的地址。
         */
        load(url: string): void;
    }
    var ImageLoader: {
        new (): ImageLoader;
    };
}
declare module lark {
    /**
     * 注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳。注意：注册后将会持续触发回调方法，若要停止回调，需要手动调用stopTick()方法。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     */
    function startTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
}
declare module lark {
    /**
     * HttpRequest 类以文本、二进制数据或 JSON对象的形式从 URL 下载数据。
     * HttpRequest 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
     * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
     * @event lark.Event.COMPLETE 加载完成
     * @event lark.Event.IO_ERROR 加载失败
     * @event lark.ProgressEvent.PROGRESS 加载进度，可通过event.bytesLoaded和event.bytesTotal统计进度信息。
     */
    interface HttpRequest extends EventEmitter {
        /**
         * 本次请求返回的数据，数据类型根据responseType设置的值确定。
         */
        response: any;
        /**
         * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
         */
        responseType: string;
        /**
         * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
         */
        withCredentials: boolean;
        /**
         * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
         */
        open(url: string, method?: string): void;
        /**
         * 发送请求.
         * @param data 需要发送的数据
         */
        send(data?: any): void;
        /**
         * 如果请求已经被发送,则立刻中止请求.
         */
        abort(): void;
        /**
         * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
         */
        getAllResponseHeaders(): string;
        /**
         * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
         * @param header 将要被赋值的请求头名称.
         * @param value 给指定的请求头赋的值.
         */
        setRequestHeader(header: string, value: string): void;
        /**
         * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
         * @param header 要返回的响应头名称
         */
        getResponseHeader(header: string): string;
    }
    var HttpRequest: {
        new (): HttpRequest;
    };
}
declare module lark {
    /**
     * 停止之前用 startTick() 方法启动的计时器。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     */
    function stopTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
}
declare module lark {
    /**
     * HttpRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
     * HttpRequest 对象应使用 POST 方法还是 GET 方法。
     */
    class HttpMethod {
        /**
         * 表示 HttpRequest 对象是一个 GET。
         */
        static GET: string;
        /**
         * 表示 HttpRequest 对象是一个 POST。
         */
        static POST: string;
    }
}
declare module lark {
    /**
     * DisplayObjectContainer 接口定义显示列表中的显示对象容器。
     * 该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 排列显示列表中的显示对象。
     * 每个 DisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，
     * 可确定哪个对象绘制在前，哪个对象绘制在后等。
     */
    interface DisplayObjectContainer extends DisplayObject {
        /**
         * 返回此对象的子项数目。
         */
        numChildren: number;
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。
         * 如果索引值为-1，则表示该 DisplayObjectContainer 对象的显示列表的前（上）部。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为 DisplayObjectContainer 该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         */
        contains(child: DisplayObject): boolean;
        /**
         * 返回位于指定索引处的子显示对象实例。
         * @param index 子对象的索引位置。
         * @returns 位于指定索引位置处的子显示对象。
         */
        getChildAt(index: number): DisplayObject;
        /**
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @returns 要标识的子显示对象的索引位置。
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * 返回具有指定名称的子显示对象。
         * @param name 要返回的子项的名称。
         * @returns 具有指定名称的子显示对象。
         */
        getChildByName(name: string): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
         * @param child 要删除的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
         * @param index 要删除的 DisplayObject 的子索引。
         * @returns 已删除的 DisplayObject 实例。
         */
        removeChildAt(index: number): DisplayObject;
        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param index1 第一个子对象的索引位置。
         * @param index2 第二个子对象的索引位置。
         */
        swapChildrenAt(index1: number, index2: number): void;
        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         */
        removeChildren(): void;
        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * 默认值为 true 即可以接收。
         */
        touchChildren: boolean;
    }
}
declare module lark {
    /**
     * HttpResponseType 定义HttpRequest.responseType属性的值。确定Http请求返回的数据格式。
     */
    class HttpResponseType {
        /**
         * 返回字符串。HttpRequest.responseType属性的默认值。
         */
        static TEXT: string;
        /**
         * 返回二进制的ArrayBuffer对象。
         */
        static ARRAY_BUFFER: string;
        /**
         * 返回 JavaScript 对象，将自动解析自服务器传递回来的 JSON 字符串。
         */
        static JSON: string;
    }
}
declare var DEBUG: boolean;
declare var RELEASE: boolean;
declare module lark {
}
declare module lark {
    var $locale_strings: any;
    var $language: string;
    /**
     * 全局多语言翻译函数
     * @param code 要查询的字符串代码
     * @param args 替换字符串中{0}标志的参数列表
     * @returns 返回拼接后的字符串
     */
    function tr(code: number, ...args: any[]): string;
}
declare module lark.sys {
    class Region {
        /**
         * 释放一个Region实例到对象池
         */
        static release(region: Region): void;
        /**
         * 从对象池中取出或创建一个新的Region对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        static create(): Region;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        width: number;
        height: number;
        area: number;
        /**
         * 是否发生移动
         */
        moved: boolean;
        setTo(minX: number, minY: number, maxX: number, maxY: number): Region;
        updateArea(): void;
        /**
         * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
         */
        union(target: Region): void;
        /**
         * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
         */
        intersect(target: Region): void;
        private setEmpty();
        /**
         * 确定此 Region 对象是否为空。
         */
        isEmpty(): boolean;
        intersects(target: Region): boolean;
        updateRegion(bounds: Rectangle, matrix: Matrix): void;
    }
}
declare module lark {
    /**
     * 为一个类定义注册运行时类信息,用此方法往类定义上注册它自身以及所有接口对应的枚举值。
     * 在运行时，这个类的实例将可以使用 lark.is() 方法传入一个枚举值来判断实例类型。
     * 例如：
     * //为lark.EventEmitter类注册运行时类信息，由于它实现了IEventEmitter接口，这里应同时传入两个枚举值。
     * lark.registerClass(lark.EventEmitter,lark.Types.EventEmitter,[lark.Types.IEventEmitter]);
     * var emitter = new lark.EventEmitter();
     * lark.log(lark.is(emitter, lark.Types.IEventEmitter));  //输出true。
     * lark.log(lark.is(emitter, lark.Types.EventEmitter));   //输出true。
     * lark.log(lark.is(emitter, lark.Types.Bitmap));   //输出false。
     *
     * 注意：传入的自定义枚举数值范围要避免与Lark框架(1~2000的数值)或其他第三方库的数值范围重合,
     * 否则有可能会导致运行时 lark.is() 方法类型判断错误。
     *
     * @param classDefinition 要注册的类定义。
     * @param classFlags 要注册的类对应的枚举值。
     * @param interfaceFlags 要注册的类所实现的接口的枚举值列表。
     */
    function registerClass(classDefinition: any, classFlag: number, interfaceFlags?: number[]): void;
}
declare module lark {
    /**
     * 哈希计数
     */
    var $hashCount: number;
    /**
     * Lark顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
     */
    class LarkObject {
        /**
         * 创建一个 lark.HashObject 对象
         */
        constructor();
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         */
        hashCode: number;
    }
}
declare module lark {
    /**
     * 提供混合模式可视效果的常量值的类。
     */
    class BlendMode {
        /**
         * 该显示对象出现在背景前面。显示对象的像素值会覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。
         */
        static NORMAL: string;
        /**
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。
         * 例如，如果显示对象的某个像素的 RGB 值为 0xAAA633，背景像素的 RGB 值为 0xDD2200，则显示像素的结果 RGB 值为 0xFFC833（因为 0xAA + 0xDD > 0xFF，0xA6 + 0x22 = 0xC8，且 0x33 + 0x00 = 0x33）。
         */
        static ADD: string;
        /**
         * 根据显示对象的 Alpha 值擦除背景。Alpha 值不为0的区域将被擦除。
         */
        static ERASE: string;
    }
}
declare module lark.sys {
    function blendModeToNumber(blendMode: string): number;
    function numberToBlendMode(blendMode: number): string;
}
declare module lark.sys {
    /**
     * 屏幕适配器实例，开发者可以通过给这个变量赋值实现了IScreenAdapter接口的实例，从而注入自定义的屏幕适配器。
     */
    var screenAdapter: IScreenAdapter;
    /**
     * 屏幕适配器默认实现，开发者可以实现自定义规则的屏幕适配器。并在初始化加载时将适配器的实例赋值给lark.sys.screenAdapter上，从而替换掉默认适配器。
     */
    class ScreenAdapter extends LarkObject implements IScreenAdapter {
        constructor();
        /**
         * 计算舞台显示尺寸
         * @param scaleMode 当前的缩放模式
         * @param screenWidth 播放器视口宽度
         * @param screenHeight 播放器视口高度
         * @param contentWidth 初始化内容宽度
         * @param contentHeight 初始化内容高度
         */
        calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): StageDisplaySize;
    }
}
declare module lark.sys {
    /**
     * 心跳计时器单例
     */
    var $ticker: Ticker;
    /**
     * 是否要广播Event.RENDER事件的标志。
     */
    var $invalidateRenderFlag: boolean;
    /**
     * 需要立即刷新屏幕的标志
     */
    var $requestRenderingFlag: boolean;
    /**
     * Lark心跳计时器
     */
    class Ticker {
        constructor();
        private playerList;
        private callBackList;
        private thisObjectList;
        private getTickIndex(callBack, thisObject);
        private concatTick();
        private frameInterval;
        private lastCount;
        /**
         * 执行一次刷新
         */
        update(): void;
        /**
         * 执行一次屏幕渲染
         */
        private render(triggerByFrame);
        /**
         * 广播EnterFrame事件。
         */
        private broadcastEnterFrame();
        /**
         * 广播Render事件。
         */
        private broadcastRender();
    }
}
declare module lark {
}
declare module lark {
    /**
     * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
     * 框架会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为两个阶段：
     * 捕获阶段包括从根到事件目标节点的行程，冒泡阶段与捕获阶段完全相反，从事件目标节点到根的行程。
     */
    class EventEmitter extends LarkObject implements IEventEmitter {
        /**
         * EventEmitter 类是可调度事件的所有类的基类。
         * EventEmitter 类实现 IEventEmitter 接口 ，并且是 DisplayObject 类的基类。
         * EventEmitter 类允许显示列表上的任何对象都是一个事件目标，同样允许使用 IEventEmitter 接口的方法。
         */
        constructor(target?: IEventEmitter);
        /**
         * 添加事件侦听器
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听。
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 once() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        once(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * 移除事件侦听器
         * @param type 事件名
         * @param listener 侦听函数
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
         */
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        /**
         * 检测是否存在监听器
         * @param type 事件类型
         * @returns 是否存在监听器，若存在返回true，反之返回false。
         */
        hasListener(type: string): boolean;
        /**
         * 检查是否用此 EventEmitter 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventEmitter 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasListener() 与 willTrigger() 方法的区别是：hasListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件类型
         * @returns 是否注册过监听器，如果注册过返回true，反之返回false
         */
        willTrigger(type: string): boolean;
        /**
         * 将事件分派到事件流中。事件目标是对其调用 emit() 方法的 EventEmitter 对象。
         * @param event 调度到事件流中的 Event 对象。
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        emit(event: Event): boolean;
        /**
         * 派发一个包含了特定参数的事件到所有注册了特定类型侦听器的对象中。 这个方法使用了一个内部的事件对象池因避免重复的分配导致的额外开销。
         * @param type 事件类型
         * @param bubbles 是否冒泡，默认false
         * @param data 附加数据(可选)
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        emitWith(type: string, bubbles?: boolean, cancelable?: boolean, data?: any): boolean;
    }
}
declare module lark.sys {
    /**
     * 事件信息对象
     */
    interface EventBin {
        type: string;
        listener: (event: Event) => void;
        thisObject: any;
        priority: number;
        target: IEventEmitter;
        useCapture: boolean;
        emitOnce: boolean;
    }
}
declare module lark {
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     */
    class Point extends LarkObject {
        /**
         * 释放一个Point实例到对象池
         */
        static release(point: Point): void;
        /**
         * 从对象池中取出或创建一个新的Point对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        static create(x: number, y: number): Point;
        /**
         * 创建一个 lark.Point 对象
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         */
        constructor(x?: number, y?: number);
        /**
         * 该点的水平坐标。默认值为 0。
         */
        x: number;
        /**
         * 该点的垂直坐标。默认值为 0。
         */
        y: number;
        /**
         * 从 (0,0) 到此点的线段长度。
         */
        length(): number;
        /**
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         */
        setTo(x: number, y: number): Point;
        /**
         * 克隆点对象
         */
        clone(): Point;
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        equals(toCompare: Point): boolean;
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         */
        static distance(p1: Point, p2: Point): number;
    }
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempPoint: Point;
}
declare module lark.sys {
    /**
     * 脏矩形计算工具类
     */
    class DirtyRegion {
        private dirtyList;
        private hasClipRect;
        private clipWidth;
        private clipHeight;
        private clipArea;
        private clipRectChanged;
        /**
         * 设置剪裁边界，超过边界的节点将跳过绘制。
         */
        setClipRect(width: number, height: number): void;
        /**
         * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
         */
        addRegion(target: Region): boolean;
        clear(): void;
        /**
         * 获取最终的脏矩形列表
         */
        getDirtyRegions(): Region[];
        /**
         * 合并脏矩形列表
         */
        private mergeDirtyList(dirtyList);
    }
}
declare module lark {
    /**
     * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。
     * 这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
     */
    class Graphics extends LarkObject {
        /**
         * 创建一个放射状渐变填充对象
         */
        static createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): GraphicsGradient;
        /**
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性 GraphicsGradient 对象。
         */
        static createLinearGradient(x0: number, y0: number, x1: number, y1: number): GraphicsGradient;
        /**
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         */
        static createPattern(bitmapData: BitmapData, repetition: string): GraphicsPattern;
        constructor();
        private _fillStyle;
        fillStyle: any;
        private _lineWidth;
        lineWidth: number;
        private _lineCap;
        lineCap: string;
        private _strokeStyle;
        strokeStyle: any;
        private _lineJoin;
        lineJoin: string;
        private _miterLimit;
        miterLimit: number;
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
        private arcBounds(x, y, radius, startAngle, endAngle);
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        lineTo(x: number, y: number): void;
        fill(fillRule?: string): void;
        closePath(): void;
        rect(x: number, y: number, w: number, h: number): void;
        moveTo(x: number, y: number): void;
        fillRect(x: number, y: number, w: number, h: number): void;
        stroke(): void;
        strokeRect(x: number, y: number, w: number, h: number): void;
        beginPath(): void;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         */
        clear(): void;
        private isFirst;
        private minX;
        private minY;
        private maxX;
        private maxY;
        private hasMoved;
        private moveToX;
        private moveToY;
        private hasStroke;
        private hasFill;
        private reset();
        private pushCommand(graphicsType, args);
        private checkMoveTo();
        private extendByPoint(x, y);
    }
    interface GraphicsCommand {
        type: number;
        arguments: any[];
    }
}
declare module lark {
    /**
     * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
     * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
     * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
     * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
     * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
     * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
     * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
     * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
     * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
     */
    class Event extends LarkObject {
        /**
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * 以下方法会触发此事件：DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         */
        static ADDED_TO_STAGE: string;
        /**
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         */
        static REMOVED_FROM_STAGE: string;
        /**
         * 将显示对象添加到显示列表中时调度。以下方法会触发此事件：
         * DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         */
        static ADDED: string;
        /**
         * 将要从显示列表中删除显示对象时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         */
        static REMOVED: string;
        /**
         * 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         */
        static ENTER_FRAME: string;
        /**
         * 渲染事件，监听此事件将会在本帧末即将开始渲染的前一刻触发回调，这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * 注意：每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 stage.invalidate() 方法，由于每帧只会触发一次屏幕刷新，
         * 若在 Event.RENDER 回调函数执行期间再次调用stage.invalidate()，将会被忽略。
         */
        static RENDER: string;
        /**
         * 舞台尺寸或UI组件尺寸发生改变
         */
        static RESIZE: string;
        /**
         * 属性值或状态发生改变。通常是按钮的选中状态，或者列表的选中项索引改变。
         */
        static CHANGE: string;
        /**
         * 属性值或状态即将发生改变,通常是按钮的选中状态，或者列表的选中项索引改变。可以通过调用 preventDefault() 方法阻止索引发生更改。
         */
        static CHANGING: string;
        /**
         * 网络请求加载完成
         */
        static COMPLETE: string;
        /**
         * 输入或输出操作失败
         */
        static IO_ERROR: string;
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
        /**
         * 事件附带的数据对象
         */
        data: any;
        /**
         * 事件的类型。类型区分大小写。
         */
        type: string;
        /**
         * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         */
        bubbles: boolean;
        /**
         * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
         */
        cancelable: boolean;
        /**
         * 事件流中的当前阶段。此属性可以包含以下数值：
         * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
         * 目标阶段 (EventPhase.AT_TARGET)。
         * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
         */
        eventPhase: number;
        /**
         * 当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
         * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
         */
        currentTarget: any;
        /**
         * 事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
         */
        target: any;
        /**
         * 检查是否已对事件调用 preventDefault() 方法。
         * @returns 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         */
        isDefaultPrevented(): boolean;
        /**
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 注意：当cancelable属性为false时，此方法不可用。
         */
        preventDefault(): void;
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 currentTarget 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         */
        stopPropagation(): void;
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         */
        stopImmediatePropagation(): void;
        /**
         * 当事件实例传递给Event.release()静态方法时，实例上的clean()方法将会被自动调用。
         * 若此自定义事件的实例设计为可以循环复用的，为了避免引起内存泄露，自定义事件需要覆盖此方法来确保实例被缓存前断开对外部对象的一切引用。
         */
        protected clean(): void;
        /**
         * 从对象池中取出或创建一个新的事件实例。注意：若使用此方法来创建自定义事件的实例，自定义的构造函数参数列表必须跟Event类一致。
         * 在JavaScript中，减少对象的创建次数可以获得更高的运行性能。因此我们建议您尽可能使用Event.create()和Event.release()
         * 这一对方法来创建和释放事件对象，这一对方法会将事件实例在内部缓存下来供下次循环使用，从而避免过多地重复创建对象。
         *
         * 外部调用范例：
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         */
        static create<T extends Event>(EventClass: {
            new (type: string, bubbles?: boolean, cancelable?: boolean): T;
            eventPool?: Event[];
        }, type: string, bubbles?: boolean, cancelable?: boolean): T;
        /**
         * 释放一个事件对象，并缓存到对象池。注意：此方法只能传入由Event.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * 在JavaScript中，减少对象的创建次数可以获得更高的运行性能。因此我们建议您尽可能使用Event.create()和Event.release()
         * 这一对方法来创建和释放事件对象，这一对方法会将事件实例在内部缓存下来供下次循环使用，从而避免过多地重复创建对象。
         *
         * 外部调用范例：
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         */
        static release(event: Event): void;
    }
}
declare module lark {
    /**
     * 文本输入框相关事件。
     */
    class TextInputEvent extends Event {
        /**
         * TextInput 获得焦点
         */
        static FOCUS: string;
        /**
         * TextInput 失去焦点
         */
        static BLUR: string;
        /**
         * TextInput 正在输入文本,通过事件对象的text属性可以读取最新的文本内容。
         */
        static INPUT: string;
    }
}
declare module lark {
    /**
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。
     * 使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。
     * 可以创建 Timer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。
     * 根据 Lark 的帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。
     */
    class Timer extends EventEmitter {
        /**
         * 创建一个 Timer 对象
         * @param delay 计时器事件间的延迟（以毫秒为单位）。
         * @param repeatCount 设置的计时器运行总次数。
         */
        constructor(delay: number, repeatCount?: number);
        private _delay;
        /**
         * 计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。
         * 注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
         */
        delay: number;
        /**
         * 设置的计时器运行总次数。如果重复计数设置为 0，则计时器将持续不断运行，或直至调用了 stop() 方法或节目停止。
         * 如果重复计数不为 0，则将运行计时器，运行次数为指定的次数。如果设置的 repeatCount 总数等于或小于 currentCount，则计时器将停止并且不会再次触发。
         */
        repeatCount: number;
        private _currentCount;
        /**
         * 计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。
         */
        currentCount: number;
        private _running;
        /**
         * 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。
         */
        running: boolean;
        /**
         * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
         */
        reset(): void;
        /**
         * 如果计时器尚未运行，则启动计时器。
         */
        start(): void;
        /**
         * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
         */
        stop(): void;
        private updateInterval;
        private lastCount;
    }
}
declare module lark {
}
declare module lark.sys {
    /**
     * 显示列表
     */
    class DisplayList extends LarkObject implements Renderable {
        /**
         * 释放一个DisplayList实例到对象池
         */
        static release(displayList: DisplayList): void;
        /**
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        static create(target: DisplayObject): DisplayList;
        /**
         * 创建一个DisplayList对象
         */
        constructor(root: DisplayObject);
        /**
         * 呈现绘制结果的目标画布
         */
        surface: Surface;
        offsetX: number;
        offsetY: number;
        /**
         * 显示列表根节点
         */
        root: DisplayObject;
        needRedraw: boolean;
        private drawToStage;
        /**
         * 绘图上下文
         */
        renderContext: RenderContext;
        /**
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        setClipRect(width: number, height: number): void;
        /**
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes;
        private dirtyNodeList;
        /**
         * 标记一个节点需要重新渲染
         */
        markDirty(node: Renderable): void;
        private dirtyList;
        private dirtyRegion;
        /**
         * 更新节点属性并返回脏矩形列表。
         */
        updateDirtyRegions(): Region[];
        /**
         * 绘制根节点显示对象到目标画布，返回draw的次数。
         */
        drawToSurface(): number;
        /**
         * 绘制一个显示对象
         */
        private drawDisplayObject(displayObject, context, dirtyList, drawToStage, displayList, clipRegion);
        private drawWidthBlendMode(displayObject, context, dirtyList, drawToStage, clipRegion);
        private drawWidthClip(displayObject, context, dirtyList, drawToStage, clipRegion);
        private createRenderContext(width, height);
        private drawWidthSurface(context, surface, drawToStage, offsetX, offsetY);
        private sizeChanged;
        /**
         * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
         */
        changeSurfaceSize(): void;
    }
}
declare module lark {
    /**
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     */
    class Rectangle extends LarkObject {
        /**
         * 释放一个Rectangle实例到对象池
         */
        static release(rect: Rectangle): void;
        /**
         * 从对象池中取出或创建一个新的Rectangle对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        static create(): Rectangle;
        /**
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * 矩形左上角的 x 坐标。
         */
        x: number;
        /**
         * 矩形左上角的 y 坐标。
         */
        y: number;
        /**
         * 矩形的宽度（以像素为单位）。
         */
        width: number;
        /**
         * 矩形的高度（以像素为单位）。
         */
        height: number;
        /**
         * x 和 width 属性的和。
         */
        right: number;
        /**
         * y 和 height 属性的和。
         */
        bottom: number;
        /**
         * 矩形左上角的 x 坐标。
         */
        left: number;
        /**
         * 矩形左上角的 y 坐标。
         */
        top: number;
        /**
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         */
        copyFrom(sourceRect: Rectangle): Rectangle;
        /**
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         */
        contains(x: number, y: number): boolean;
        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         */
        intersects(toIntersect: Rectangle): boolean;
        /**
         * 确定此 Rectangle 对象是否为空。
         */
        isEmpty(): boolean;
        /**
         * 将 Rectangle 对象的所有属性设置为 0。
         */
        setEmpty(): void;
        /**
         * 克隆矩形对象
         * @returns 返回克隆后的矩形
         */
        clone(): Rectangle;
    }
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempRectangle: Rectangle;
}
declare module lark {
    /**
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     */
    class TimerEvent extends Event {
        /**
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         */
        static TIMER: string;
        /**
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         */
        static TIMER_COMPLETE: string;
        /**
         * 创建一个 TimerEvent 对象
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         */
        updateAfterEvent(): void;
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param type 事件类型
         */
        static emitTimerEvent(target: IEventEmitter, type: string, bubbles?: boolean, cancelable?: boolean): boolean;
    }
}
declare module lark {
    /**
     * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
     * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
     * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
     * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
     * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
     * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
     *
     * @version Lark 1.0
     * @platform HTML5,Runtime,Native
     */
    class TouchEvent extends Event {
        /**
         * 移动
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static TOUCH_MOVE: string;
        /**
         * 开始触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static TOUCH_BEGIN: string;
        /**
         * 结束触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static TOUCH_END: string;
        /**
         * 轻拍，开始和结束触摸都在同一对象上
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static TOUCH_TAP: string;
        /**
         * 在开始触摸的对象的外部结束触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static TOUCH_RELEASE_OUTSIDE: string;
        /**
         * 创建一个 TouchEvent 对象，其中包含有关Touch事件的信息
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, stageX?: number, stageY?: number, touchPointID?: number);
        /**
         * 事件发生点在全局舞台坐标中的水平坐标。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        stageX: number;
        /**
         * 事件发生点在全局舞台坐标中的垂直坐标。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        stageY: number;
        /**
         * @private
         */
        private localPoint;
        /**
         * @private
         */
        private getLocalXY();
        /**
         * 事件发生点相对于currentTarget的水平坐标。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        localX: number;
        /**
         * 事件发生点相对于currentTarget的垂直坐标。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        localY: number;
        /**
         * 分配给触摸点的唯一标识号
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        touchPointID: number;
        /**
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        updateAfterEvent(): void;
        /**
         * 使用指定的EventEmitter对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 派发事件目标
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         *
         * @see lark.Event.create()
         * @see lark.Event.release()
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        static emitTouchEvent(target: IEventEmitter, type: string, bubbles?: boolean, cancelable?: boolean, stageX?: number, stageY?: number, touchPointID?: number): boolean;
    }
}
declare module lark.sys {
    /**
     * 显示对象失效标志
     */
    const enum DisplayObjectFlags {
        /**
         * 显示对象是否开启像素级精确碰撞，开启后显示对象的透明区域将可以穿透，Graphics默认开启此功能，。
         */
        PixelHitTest = 1,
        /**
         * 显示对象自身的绘制区域尺寸失效
         */
        InvalidContentBounds = 2,
        /**
         * 显示对象的矩形区域尺寸失效，包括自身绘制区域和子项的区域集合
         */
        InvalidBounds = 4,
        /**
         * 显示对象的matrix属性失效标志，通常因为scaleX，width等属性发生改变。
         */
        InvalidMatrix = 8,
        /**
         * 显示对象祖代的矩阵失效。
         */
        InvalidConcatenatedMatrix = 16,
        /**
         * 显示对象祖代的逆矩阵失效。
         */
        InvalidInvertedConcatenatedMatrix = 32,
        /**
         * 显示对象祖代的透明度属性失效。
         */
        InvalidConcatenatedAlpha = 64,
        /**
         * 显示对象应该被缓存成位图的标志，即使没有设置这个标志，也有可能被缓存成位图，例如含有滤镜的情况。
         * 而当设置了这个标志，如果内存不足，也会放弃缓存。
         */
        CacheAsBitmap = 128,
        /**
         * 显示对象自身需要重绘的标志
         */
        DirtyRender = 256,
        /**
         * 子项中已经全部含有DirtyRender标志，无需继续遍历。
         */
        DirtyChildren = 512,
        /**
         * 对象自身在舞台上的显示尺寸发生改变。
         */
        TouchEnabled = 1024,
        /**
         * 对象自身以及子项在舞台上显示尺寸发生改变。
         */
        TouchChildren = 2048,
        /**
         * DirtyRender|DirtyChildren
         */
        Dirty = 768,
        /**
         * 添加或删除子项时，需要向子项传递的标志。
         */
        DownOnAddedOrRemoved = 624,
        /**
         * 显示对象初始化时的标志量
         */
        InitFlags = 3952,
    }
}
declare module lark {
    /**
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
     * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
     * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
     * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
     */
    class DisplayObject extends EventEmitter implements sys.Renderable {
        /**
         * 创建一个显示对象
         */
        constructor();
        private invalidateMatrix();
        /**
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        private invalidatePosition();
        /**
         * 表示 DisplayObject 的实例名称。
         * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
         */
        name: string;
        /**
         * 表示包含此显示对象的 DisplayObjectContainer 对象。
         * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
         */
        parent: DisplayObjectContainer;
        /**
         * 显示对象的舞台。
         * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。
         * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
         */
        stage: Stage;
        /**
         * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。
         * 注意：必须对matrix属性重新赋值改变的值才能生效，若获取matrix引用来修改对象属性，将不会发生任何改变。
         */
        matrix: Matrix;
        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        x: number;
        /**
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         */
        y: number;
        /**
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        scaleX: number;
        /**
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * 默认值为 1，即不缩放。
         * @default 1
         */
        scaleY: number;
        /**
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
         * 减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
         * @default 0 默认值为 0 不旋转。
         */
        rotation: number;
        /**
         * 表示显示对象的宽度，以像素为单位。
         */
        width: number;
        /**
         * 表示显示对象的高度，以像素为单位。
         */
        height: number;
        /**
         * 显示对象是否可见。
         * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
         * 默认值为 true 可见
         */
        visible: boolean;
        /**
         * 如果设置为 true，则 Lark 播放器将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
         * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
         * 具体取决于显示对象内容的复杂性。在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
         * 最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放和旋转的显示对象一起使用。
         */
        cacheAsBitmap: boolean;
        /**
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
         *  @default 1 默认值为 1。
         */
        alpha: number;
        /**
         * 指定此对象是否接收鼠标/触摸事件
         * @default true 默认为 true 即可以接收。
         */
        touchEnabled: boolean;
        /**
         * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透，设置为false将只检查显示对象测量的最大矩形区域。
         * 开启此属性将会有一定量的额外性能损耗，Shape和Sprite等含有矢量图的类默认开启此属性，其他类默认关闭。
         */
        pixelHitTest: boolean;
        /**
         * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
         * 注意：必须对scrollRect属性重新赋值改变的值才能生效，若获取scrollRect引用来修改对象属性，将不会发生任何改变。
         */
        scrollRect: Rectangle;
        /**
         * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上
         * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
         */
        blendMode: string;
        /**
         * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
         * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
         * Sprite 对象，它必须在显示列表中。
         * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
         * 该对象的 mask 属性将变为 null。
         */
        mask: DisplayObject;
        /**
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Rectangle对象来存储结果，
         * 若不传入将创建一个新的Rectangle对象返回。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         */
        getBounds(targetCoordinateSpace: DisplayObject, resultRect?: Rectangle): Rectangle;
        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        globalToLocal(stageX: number, stageY: number, resultPoint?: Point): Point;
        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param localX 舞台坐标x
         * @param localY 舞台坐标y
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        localToGlobal(localX: number, localY: number, resultPoint?: Point): Point;
        private hitTestPixel(localX, localY);
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        emit(event: Event): boolean;
        willTrigger(type: string): boolean;
    }
}
declare module lark {
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     */
    class Matrix extends LarkObject {
        /**
         * 释放一个Matrix实例到对象池
         */
        static release(matrix: Matrix): void;
        /**
         * 从对象池中取出或创建一个新的Matrix对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        static create(): Matrix;
        /**
         * 创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         */
        a: number;
        /**
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         */
        b: number;
        /**
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         */
        c: number;
        /**
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         */
        d: number;
        /**
         * 沿 x 轴平移每个点的距离
         */
        tx: number;
        /**
         * 沿 y 轴平移每个点的距离
         */
        ty: number;
        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         */
        clone(): Matrix;
        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
         * @param other 要连接到源矩阵的矩阵。
         */
        concat(other: Matrix): void;
        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         */
        copyFrom(other: Matrix): Matrix;
        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         */
        identity(): void;
        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         */
        invert(): void;
        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         */
        rotate(angle: number): void;
        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         */
        scale(sx: number, sy: number): void;
        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         */
        transformPoint(pointX: number, pointY: number, resultPoint?: Point): Point;
        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         */
        translate(dx: number, dy: number): void;
        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         */
        equals(other: Matrix): boolean;
        private getDeterminant();
    }
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempMatrix: Matrix;
}
declare module lark {
    /**
     * 当加载操作已开始或套接字已接收到数据时，将调度 ProgressEvent 对象。
     * 有两种类型的进程事件：ProgressEvent.PROGRESS 和 ProgressEvent.SOCKET_DATA。
     */
    class ProgressEvent extends Event {
        /**
         * 在下载操作过程中收到数据时调度。
         */
        static PROGRESS: string;
        /**
         * 在套接字接收到数据后调度。
         */
        static SOCKET_DATA: string;
        /**
         * 在侦听器处理事件时加载的项数或字节数。
         */
        bytesLoaded: number;
        /**
         * 如果加载过程成功，将加载的总项数或总字节数。
         */
        bytesTotal: number;
        /**
         * 创建一个 ProgressEvent 对象
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, bytesLoaded?: number, bytesTotal?: number);
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 派发事件目标
         * @param type 事件类型
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         */
        static emitProgressEvent(target: IEventEmitter, type: string, bytesLoaded?: number, bytesTotal?: number): boolean;
    }
}
declare module lark.sys {
    /**
     * 用户交互操作管理器
     */
    class TouchHandler extends LarkObject {
        constructor(stage: Stage);
        private stage;
        private touchDownTarget;
        /**
         * 触摸开始（按下）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchBegin(x: number, y: number, touchPointID: number): void;
        private lastTouchX;
        private lastTouchY;
        /**
         * 触摸移动
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchMove(x: number, y: number, touchPointID: number): void;
        /**
         * 触摸结束（弹起）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchEnd(x: number, y: number, touchPointID: number): void;
        /**
         * 获取舞台坐标下的触摸对象
         */
        private findTarget(stageX, stageY);
    }
}
declare module lark {
    /**
     * 此类用于使用 Lark 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
     */
    class Shape extends DisplayObject {
        /**
         * 创建一个 Shape 对象
         */
        constructor();
        /**
         * 获取 Shape 中的 Graphics 对象。
         */
        graphics: Graphics;
    }
}
declare module lark {
    /**
     * Bitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 Bitmap() 构造函数创建的图像。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象的引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与转换属性或旋转属性无关。
     * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的复杂 BitmapData 对象，
     * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生内存开销。
     */
    class Bitmap extends DisplayObject {
        /**
         * 创建一个Bitmap对象
         */
        constructor(bitmapData?: BitmapData);
        /**
         * 被引用的 BitmapData 对象。
         */
        bitmapData: BitmapData;
        /**
         * 控制在缩放时是否对位图进行平滑处理。如果为 true，则会在缩放时对位图进行平滑处理。
         * 如果为 false，则不会在缩放时对位图进行平滑处理。默认true。
         */
        smoothing: boolean;
    }
}
declare module lark.sys {
    const enum TextKeys {
        fontSize = 0,
        lineSpacing = 1,
        textColor = 2,
        textFieldWidth = 3,
        textFieldHeight = 4,
        textWidth = 5,
        textHeight = 6,
        textDrawWidth = 7,
        fontFamily = 8,
        textAlign = 9,
        verticalAlign = 10,
        colorString = 11,
        fontString = 12,
        text = 13,
        measuredWidths = 14,
        bold = 15,
        italic = 16,
        fontStringChanged = 17,
        textLinesChanged = 18,
        wordWrap = 19,
        displayAsPassword = 20,
        maxChars = 21,
    }
}
declare module lark {
    /**
     * TextField 类用于创建显示对象以显示文本。可以使用 TextField 类的方法和属性对文本字段进行操作。
     * 注意:TextField.width和TextField.height与其他显示对象的定义不同。
     * 其他显示对象的width，height属性始终等于getBounds(parent)方法返回的尺寸，即包含旋转和缩放值，若设置width或height也将会直接修改scaleX和scaleY的值。
     * 而 TextField 返回的宽高值并不包含旋转和缩放值，设置TextField.width和TextField.height也不会影响scaleX或scaleY的值。
     * 设置TextField.width可以强制让文本换行，若文本显示宽度超过您显式设置的值，将会自动换行。
     * 设置TextField.height可以截断文本，若文本显示高度超过您显式设置的值，将会截断不显示。
     * 若您需要重置文本宽高为未设置状态，请将宽高属性赋值为 lark.NONE 即可。
     */
    class TextField extends DisplayObject {
        /**
         * 创建一个TextField对象
         */
        constructor(text?: string);
        /**
         * 字体名称 。默认值：sans-serif
         */
        fontFamily: string;
        /**
         * 字号大小,默认值30 。
         */
        fontSize: number;
        /**
         * 是否显示为粗体，默认false。
         */
        bold: boolean;
        /**
         * 是否显示为斜体，默认false。
         */
        italic: boolean;
        private invalidateFontString();
        /**
         * 获取字体信息的字符串形式。
         */
        private getFontString();
        /**
         * 文字的水平对齐方式 ,请使用HorizontalAlign中定义的常量。
         * 默认值：HorizontalAlign.LEFT。
         */
        textAlign: string;
        /**
         * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
         * 默认值：VerticalAlign.TOP。
         */
        verticalAlign: string;
        /**
         * 行间距。标准行高通常等于fontSize的值，设置此属性，将会在标准行高之间添加指定像素的空白间隔。可以设置为负值。默认值0.
         */
        lineSpacing: number;
        /**
         * 文本颜色，默认值0x000000
         */
        textColor: number;
        /**
         * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
         * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。默认值为 true。
         */
        wordWrap: boolean;
        /**
         * 要显示的文本内容
         */
        text: string;
        private textLines;
        /**
         * 文本行数。
         */
        numLines: number;
        /**
         * 文本内容宽度
         */
        textWidth: number;
        /**
         * 文本内容高度
         */
        textHeight: number;
        private updateTextLines();
    }
}
declare module lark.sys {
    function toFontString(style: {
        fontFamily?: string;
        fontSize?: number;
        bold?: boolean;
        italic?: boolean;
    }): string;
    function toColorString(value: number): string;
}
declare module lark {
    /**
     * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
     */
    class Sprite extends DisplayObject implements DisplayObjectContainer {
        /**
         * 实例化一个容器
         */
        constructor();
        /**
         * 返回此对象的子项数目。
         */
        numChildren: number;
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。
         * （要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。
         * 索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * 当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        private doAddChild(child, index);
        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
         * 孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为 DisplayObjectContainer 该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         */
        contains(child: DisplayObject): boolean;
        /**
         * 返回位于指定索引处的子显示对象实例。
         * @param index 子对象的索引位置。
         * @returns 位于指定索引位置处的子显示对象。
         */
        getChildAt(index: number): DisplayObject;
        /**
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @returns 要标识的子显示对象的索引位置。
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * 返回具有指定名称的子显示对象。
         * @param name 要返回的子项的名称。
         * @returns 具有指定名称的子显示对象。
         */
        getChildByName(name: string): DisplayObject;
        /**
         * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
         * @param child 要删除的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
         * @param index 要删除的 DisplayObject 的子索引。
         * @returns 已删除的 DisplayObject 实例。
         */
        removeChildAt(index: number): DisplayObject;
        private doRemoveChild(index);
        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        setChildIndex(child: DisplayObject, index: number): void;
        private doSetChildIndex(child, index);
        /**
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param index1 第一个子对象的索引位置。
         * @param index2 第二个子对象的索引位置。
         */
        swapChildrenAt(index1: number, index2: number): void;
        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        private doSwapChildrenAt(index1, index2);
        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         */
        removeChildren(): void;
        /**
         * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
         * 默认值为 true 即可以接收。
         */
        touchChildren: boolean;
        private markChildDirty(child, parentCache);
        private assignParentDisplayList(child, parentCache, newParent);
    }
}
declare module lark {
    /**
     * TextInput 用于创建显示对象来输入文本. 默认为单行文本，当需要使用多行文本时，请设置 multiLine 为 true
     */
    class TextInput extends TextField {
        constructor();
        /**
         * 一个布尔值，表示是否显示为一个密码输入框
         * @returns {boolean}
         */
        displayAsPassword: boolean;
        /**
         * 设置或获取TextInput的最大输入长度，这个属性只限制用户输入的字符长度
         * 通过 text 属性可以设置比 maxChars 更长的字符串
         * @returns {number}
         */
        maxChars: number;
        private _isTyping;
        private _isFocus;
        private handleTouchBegin(e);
        private setAsCurrent();
        private timeoutId;
        private updateTextAdapter();
    }
}
declare module lark {
    /**
     * Stage 类代表主绘图区，表示显示 Lark 内容的整个区域。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。
     * Stage 类具有多个祖代类 -- DisplayObjectContainer、DisplayObject 和 EventDispatcher，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     */
    class Stage extends Sprite {
        /**
         * 舞台对象不允许自行实例化。
         */
        constructor();
        /**
         * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。
         * 注意，若同一个网页中包含多个lark.Stage实例，修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
         */
        frameRate: number;
        /**
         * 舞台的当前宽度（以像素为单位）。
         */
        stageWidth: number;
        /**
         * 舞台的当前高度（以像素为单位）。
         */
        stageHeight: number;
        /**
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         */
        invalidate(): void;
        private implMap;
        /**
         * 注册一个接口实现。Lark框架内预留了多个可由项目高度定制化的功能接口，使用此方法能够将项目中针对某接口的具体实现实例注入到框架中使用。
         * @param interfaceName 注入的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @param instance 实现此接口的实例。
         */
        registerImplementation(interfaceName: string, instance: any): void;
        /**
         * 获取一个接口实现。此方法通常由框架内部调用。获取项目注入的自定义实现实例。
         * @param interfaceName 要获取的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @returns 返回实现此接口的实例。
         */
        getImplementation(interfaceName: string): any;
    }
}
declare module lark.sys {
    /**
     * Lark播放器
     */
    class Player extends LarkObject {
        /**
         * 实例化一个播放器对象。
         */
        constructor(context: RenderContext, stage: Stage, entryClassName: string);
        private createDisplayList(stage, context);
        private screenDisplayList;
        /**
         * 入口类的完整类名
         */
        private entryClassName;
        /**
         * 舞台引用
         */
        stage: Stage;
        /**
         * 入口类实例
         */
        private root;
        private isPlaying;
        /**
         * 启动播放器
         */
        start(): void;
        private initialize();
        /**
         * 停止播放器，停止后将不能重新启动。
         */
        stop(): void;
        /**
         * 暂停播放器，后续可以通过调用start()重新启动播放器。
         */
        pause(): void;
        /**
         * 更新舞台尺寸
         * @param stageWidth 舞台宽度（以像素为单位）
         * @param stageHeight 舞台高度（以像素为单位）
         */
        updateStageSize(stageWidth: number, stageHeight: number): void;
        /**
         * 显示FPS，仅在DEBUG模式下有效。
         */
        displayFPS: (showFPS: boolean, showLog: boolean, logFilter: string) => void;
        private showFPS;
        private showLog;
        private fpsDisplay;
        /**
         * 是否显示脏矩形重绘区，仅在DEBUG模式下有效。
         */
        showPaintRect: (value: boolean) => void;
        private drawDirtyRect;
        private _showPaintRect;
        private stageDisplayList;
        private paintList;
        private drawPaintRect;
    }
    var $logToFPS: (info: string) => void;
}
declare module lark {
    /**
     * 为Lark框架内的类或接口定义的枚举值。通常作为实例检查类型 lark.is() 方法的参数。
     */
    const enum Types {
        /**
         * IEventEmitter 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
         * 事件目标是 Lark 事件模型的重要组成部分。事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击或按键等事件时，
         * 会将事件对象调度到从显示列表根开始的事件流中。事件对象进行到事件目标的往返行程，在概念上，到事件目标的此往返行程被划分为两个阶段：
         * 捕获阶段包括从根到事件目标节点的行程，冒泡阶段与捕获阶段完全相反，从事件目标节点到根的行程。
         * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），
         * 则可以实现 IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的挂钩，将调用连接到聚合的 EventEmitter 中。
         */
        IEventEmitter = 1,
        /**
         * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
         * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
         * 框架会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
         * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为两个阶段：
         * 捕获阶段包括从根到事件目标节点的行程，冒泡阶段与捕获阶段完全相反，从事件目标节点到根的行程。
         */
        EventEmitter = 2,
        /**
         * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
         * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
         * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
         * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
         * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
         */
        DisplayObject = 3,
        /**
         * DisplayObjectContainer 类是可用作显示列表中显示对象容器的所有对象的基类。
         * 该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
         * 每个 DisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，
         * 可确定哪个对象绘制在前，哪个对象绘制在后等。
         */
        DisplayObjectContainer = 4,
        /**
         * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
         */
        Sprite = 5,
        /**
         * Bitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 Bitmap() 构造函数创建的图像。
         * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象的引用的 Bitmap 对象。创建了 Bitmap 对象后，
         * 使用父 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
         * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与转换属性或旋转属性无关。
         * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的复杂 BitmapData 对象，
         * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生内存开销。
         */
        Bitmap = 6,
        /**
         * BitmapData 对象包含像素数据的数组。此数据可以表示完全不透明的位图，或表示包含 Alpha 通道数据的透明位图。
         * 以上任一类型的 BitmapData 对象都作为 32 位整数的缓冲区进行存储。每个 32 位整数确定位图中单个像素的属性。
         * 每个 32 位整数都是四个 8 位通道值（从 0 到 255）的组合，这些值描述像素的 Alpha 透明度以及红色、绿色、蓝色 (ARGB) 值。
         * （对于 ARGB 值，最高有效字节代表 Alpha 通道值，其后的有效字节分别代表红色、绿色和蓝色通道值。）
         */
        BitmapData = 7,
        /**
         * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。
         * 这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
         */
        Graphics = 8,
        /**
         * 此类用于使用 Lark 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
         */
        Shape = 9,
        /**
         * Stage 类代表主绘图区，表示显示 Lark 内容的整个区域。
         * 可以利用 DisplayObject 实例的 stage 属性进行访问。
         * Stage 类具有多个祖代类 -- DisplayObjectContainer、DisplayObject 和 EventDispatcher，属性和方法便是从这些类继承而来的。
         * 从这些继承的许多属性和方法不适用于 Stage 对象。
         */
        Stage = 10,
        /**
         * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
         * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
         * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
         * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
         * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
         * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
         * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
         * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
         * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
         */
        Event = 11,
        /**
         * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
         */
        TimerEvent = 12,
        /**
         * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
         * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
         * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
         * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
         * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
         * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
         */
        TouchEvent = 13,
        /**
         * 当加载操作已开始或套接字已接收到数据时，将调度 ProgressEvent 对象。
         * 有两种类型的进程事件：ProgressEvent.PROGRESS 和 ProgressEvent.SOCKET_DATA。
         */
        ProgressEvent = 14,
        /**
         * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
         * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
         * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
         */
        Matrix = 15,
        /**
         * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
         */
        Point = 16,
        /**
         * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
         * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
         * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
         * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
         */
        Rectangle = 17,
        /**
         * TextField 类用于创建显示对象以显示文本。
         * 可以使用 TextField 类的方法和属性对文本字段进行操作。
         */
        TextField = 18,
        /**
         * HttpRequest 类以文本、二进制数据或 JSON对象的形式从 URL 下载数据。。
         * HttpRequest 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
         * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
         */
        HttpRequest = 19,
        /**
         * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
         */
        ImageLoader = 20,
        /**
         * TextInput 用于创建显示对象来输入文本. 默认为单行文本，当需要使用多行文本时，请设置 multiLine 为 true
         */
        TextInput = 21,
    }
}
