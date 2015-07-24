declare var DEBUG: boolean;
declare var RELEASE: boolean;
declare module lark {
}
declare module lark {
    /**
     * @language en_US
     * Registers the runtime class information for a class.This method adds some strings which represent the class name or
     * some interface names to the class definition. After the registration,you can use lark.is() method to do the type checking
     * for the instance of this class.<br/>
     * Note:If you use the TypeScript programming language, the lark command line tool will automatically generate the registration code line.
     * You don't need to manually call this method.
     *
     * @example the following code shows how to register the runtime class information for the EventEmitter class and do the type checking:
     * <pre>
     *      lark.registerClass(lark.EventEmitter,"lark.EventEmitter",["lark.IEventEmitter"]);
     *      var emitter = new lark.EventEmitter();
     *      lark.log(lark.is(emitter, "lark.IEventEmitter"));  //true。
     *      lark.log(lark.is(emitter, "lark.EventEmitter"));   //true。
     *      lark.log(lark.is(emitter, "lark.Bitmap"));   //false。
     * </pre>
     * @param classDefinition the class definition to be registered.
     * @param className  a unique identification string of the specific class
     * @param interfaceNames a list of unique identification string of the specific interfaces.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 为一个类定义注册运行时类信息,用此方法往类定义上注册它自身以及所有接口对应的字符串。
     * 在运行时，这个类的实例将可以使用 lark.is() 方法传入一个字符串来判断实例类型。
     * @example 以下代码演示了如何为EventEmitter类注册运行时类信息并判断类型：
     * <pre>
     *      //为lark.EventEmitter类注册运行时类信息，由于它实现了IEventEmitter接口，这里应同时传入接口名对应的字符串。
     *      lark.registerClass(lark.EventEmitter,"lark.EventEmitter",["lark.IEventEmitter"]);
     *      var emitter = new lark.EventEmitter();
     *      lark.log(lark.is(emitter, "lark.IEventEmitter"));  //true。
     *      lark.log(lark.is(emitter, "lark.EventEmitter"));   //true。
     *      lark.log(lark.is(emitter, "lark.Bitmap"));   //false。
     * </pre>
     * 注意：若您使用 TypeScript 来编写程序，lark 命令行会自动帮您生成类信息注册代码行到最终的 Javascript 文件中。因此您不需要手动调用此方法。
     *
     * @param classDefinition 要注册的类定义。
     * @param className 要注册的类名。
     * @param interfaceNames 要注册的类所实现的接口名列表。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function registerClass(classDefinition: any, className: string, interfaceNames?: string[]): void;
}
declare module lark {
    /**
     * @language en_US
     * Stops the timer started by the lark.startTick() method.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Lark framework was initialized. If the return value of this method is true, it will force Lark runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 停止之前用 startTick() 方法启动的计时器。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function stopTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
}
declare module lark {
    /**
     * @copy lark.Motion
     */
    var Motion: {
        new (): Motion;
    };
    /**
     * @language en_US
     * The Motion class emits events based on activity detected by the device's motion sensor.
     * This data represents the device's movement along a 3-dimensional axis. When the device moves,
     * the sensor detects this movement and emit the CHANGE event. @see lark.MotionEvent
     *
     * @event lark.Event.CHANGE device is moved
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Motion 类从用户设备读取运动状态信息并派发 CHANGE 事件。
     * 当设备移动时，传感器会检测到此移动并返回设备加速度，重力和旋转数据。@see lark.MotionEvent
     * Motion 类提供了 start 和 stop 方法，来启动和停止运动信息检查
     *
     * @event lark.Event.CHANGE 运动状态发生改变
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Motion extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor device movement
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备运动状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor device movement
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备运动状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
    /**
     * @language en_US
     * A DeviceRotationRate object provides information about the rate at which
     * the device is rotating around all three axes.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DeviceRotationRate 提供设备围绕三个轴旋转的角速度信息，单位是 角度/秒
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface DeviceRotationRate {
        /**
         * @language en_US
         * The amount of rotation around the Z axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 Z 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        alpha: number;
        /**
         * @language en_US
         * The amount of rotation around the X axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 X 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        beta: number;
        /**
         * @language en_US
         * The amount of rotation around the Y axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 Y 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        gamma: number;
    }
    /**
     * @language en_US
     * A DeviceAcceleration object provides information about the amount
     * of acceleration the device is experiencing along all three axes.
     * Acceleration is expressed in m/s2.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DeviceAcceleration 提供设备在三个维度的加速度信息，加速度值的单位是 m/s2
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface DeviceAcceleration {
        /**
         * @language en_US
         * The amount of acceleration along the X axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * X 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        x: number;
        /**
         * @language en_US
         * The amount of acceleration along the Y axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Y 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        y: number;
        /**
         * @language en_US
         * The amount of acceleration along the Z axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Z 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        z: number;
    }
}
declare module lark {
    /**
     * @language en_US
     * The GraphicsGradient interface represents an opaque object describing a gradient. It is returned by the static methods
     * Graphics.createLinearGradient() or Graphics.createRadialGradient().
     * @see lark.Graphics#createLinearGradient()
     * @see lark.Graphics#createRadialGradient()
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GraphicsGradient 接口表示描述渐变的不透明对象。通过 Graphics.createLinearGradient() 或 Graphics.createRadialGradient() 等静态方法的返回值得到.
     * @see lark.Graphics#createLinearGradient()
     * @see lark.Graphics#createRadialGradient()
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface GraphicsGradient {
        /**
         * @language en_US
         * Adds a new stop, defined by an offset and a color, to the gradient. If the offset is not between 0 and 1 an
         * error is thrown, if the color can't be parsed as a color, an error is thrown.
         * @param offset the value between 0 and 1.
         * @param color the color to add.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 添加一个由偏移值和颜色值指定的断点到渐变。如果偏移值不在0到1之间，将抛出错误，如果 color 不能被解析为有效的颜色值，也将抛出错误。
         * @param offset 0到1之间的值
         * @param color 要设置颜色值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        addColorStop(offset: number, color: string): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The GraphicsPattern interface represents an opaque object describing a pattern, based on a BitmapData,
     * created by the Graphics.createPattern() method.
     * @see lark.Graphics#createPattern()
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GraphicsPattern 接口表示描述一个模板（基于BitmapData）的不透明对象，通过 Graphics.createPattern() 静态方法创建.
     * @see lark.Graphics#createPattern()
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface GraphicsPattern {
    }
}
declare module lark {
    /**
     * @language en_US
     * The Geolocation able to obtain the position of the device.
     * Geolocation will emit CHANGE event when the device's location is changed.
     * It will emit IO_ERROR event if the location request is denied
     * or there is no location service on the device.
     *
     * @event lark.Event.CHANGE The device's location is changed
     * @event lark.Event.IO_ERROR Error occurred while getting the location
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Geolocation 能够从设备的定位服务获取设备的当前位置。
     * 当设备的位置发生改变时 Geolocation 会派发 CHANGE 事件。
     * 当定位请求被拒绝或该设备没有定位服务时 Geolocation 会派发 IO_ERROR 事件。
     *
     * @event lark.Event.CHANGE 设备位置发生改变
     * @event lark.Event.IO_ERROR 获取设备位置时发生错误
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Geolocation extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
    /**
     * @copy lark.Geolocation
     */
    var Geolocation: {
        new (): Geolocation;
    };
}
declare module lark {
    /**
     * @language en_US
     * The DisplayObjectContainer class is the base class for all objects that can serve as display object containers on
     * the display list. The display list manages all objects displayed in the runtime. Use the DisplayObjectContainer
     * class to arrange the display objects in the display list. Each DisplayObjectContainer object has its own child list
     * for organizing the z-order of the objects. The z-order is the front-to-back order that determines which object is
     * drawn in front, which is behind, and so on.
     * @see lark.DisplayObject
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DisplayObjectContainer 接口定义显示列表中的显示对象容器。该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer
     * 排列显示列表中的显示对象。每个 DisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，
     * 可确定哪个对象绘制在前，哪个对象绘制在后等。
     * @see lark.DisplayObject
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface DisplayObjectContainer extends DisplayObject {
        /**
         * @language en_US
         * Returns the number of children of this object.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回此对象的子项数目。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        numChildren: number;
        /**
         * @language en_US
         * Adds a child DisplayObject instance to this DisplayObjectContainer instance. The child is added to the front
         * (top) of all other children in this DisplayObjectContainer instance. (To add a child to a specific index position,
         * use the addChildAt() method.)If you add a child object that already has a different display object container
         * as a parent, the object is removed from the child list of the other display object container.
         * @param child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
         * @returns 在 child The DisplayObject instance that you pass in the child parameter.
         * @see #addChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他
         * 所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         * @see #addChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * @language en_US
         * Adds a child DisplayObject instance to this DisplayObjectContainer instance. The child is added at the index position
         * specified. An index of 0 represents the back (bottom) of the display list for this DisplayObjectContainer object.
         * If you add a child object that already has a different display object container as a parent, the object is removed
         * from the child list of the other display object container.
         * @param child The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
         * @param index The index position to which the child is added. If you specify a currently occupied index position,
         * the child object that exists at that position and all higher positions are moved up one position in the child list.
         * @returns The DisplayObject instance that you pass in the child parameter.
         * @see #addChild()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该
         * DisplayObjectContainer 对象的显示列表的后（底）部。如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         * @see #addChild()
         * @version Lark 1.0
         * @platform Web,Native
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        /**
         * @language en_US
         * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance
         * itself. The search includes the entire display list including this DisplayObjectContainer instance. Grandchildren,
         * great-grandchildren, and so on each return true.
         * @param child The child object to test.
         * @returns true if the child object is a child of the DisplayObjectContainer or the container itself; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
         * 孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为 DisplayObjectContainer 该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        contains(child: DisplayObject): boolean;
        /**
         * @language en_US
         * Returns the child display object instance that exists at the specified index.
         * @param index The index position of the child object.
         * @returns The child display object at the specified index position.
         * @see #getChildByName()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回位于指定索引处的子显示对象实例。
         * @param index 子对象的索引位置。
         * @returns 位于指定索引位置处的子显示对象。
         * @see #getChildByName()
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildAt(index: number): DisplayObject;
        /**
         * @language en_US
         * Returns the index position of a child DisplayObject instance.
         * @param child The DisplayObject instance to identify.
         * @returns The index position of the child display object to identify.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @returns 要查找的子显示对象的索引位置。
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * @language en_US
         * Returns the child display object that exists with the specified name. If more that one child display object has
         * the specified name, the method returns the first object in the child list.The getChildAt() method is faster than
         * the getChildByName() method. The getChildAt() method accesses a child from a cached array, whereas the getChildByName()
         * method has to traverse a linked list to access a child.
         * @param name The name of the child to return.
         * @returns The child display object with the specified name.
         * @see #getChildAt()
         * @see lark.DisplayObject#name
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回具有指定名称的子显示对象。如果多个子显示对象具有指定名称，则该方法会返回子级列表中的第一个对象。
         * getChildAt() 方法比 getChildByName() 方法快。getChildAt() 方法从缓存数组中访问子项，而 getChildByName() 方法则必须遍历链接的列表来访问子项。
         * @param name 要返回的子项的名称。
         * @returns 具有指定名称的子显示对象。
         * @see #getChildAt()
         * @see lark.DisplayObject#name
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildByName(name: string): DisplayObject;
        /**
         * @language en_US
         * Removes the specified child DisplayObject instance from the child list of the DisplayObjectContainer instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any display objects above the child in the DisplayObjectContainer are
         * decreased by 1.
         * @param child The DisplayObject instance to remove.
         * @returns The DisplayObject instance that you pass in the child parameter.
         * @see #removeChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从 DisplayObjectContainer 实例的子列表中删除指定的 child DisplayObject 实例。将已删除子项的 parent 属性设置为 null；
         * 如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。DisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。
         * @param child 要删除的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         * @see #removeChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * @language en_US
         * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer.
         * The parent property of the removed child is set to null, and the object is garbage collected if no other references
         * to the child exist. The index positions of any display objects above the child in the DisplayObjectContainer are decreased by 1.
         * @param index The child index of the DisplayObject to remove.
         * @returns The DisplayObject instance that was removed.
         * @see #removeChild()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。将已删除子项的 parent 属性设置为 null；
         * 如果没有对该子项的任何其他引用，则将该对象作为垃圾回收。DisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。
         * @param index 要删除的 DisplayObject 的子索引。
         * @returns 已删除的 DisplayObject 实例。
         * @see #removeChild()
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChildAt(index: number): DisplayObject;
        /**
         * @language en_US
         * Changes the position of an existing child in the display object container. This affects the layering of child objects.
         * @param child The child DisplayObject instance for which you want to change the index number.
         * @param index The resulting index number for the child display object.
         * @see #addChildAt()
         * @see #getChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         * @see #addChildAt()
         * @see #getChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * @language en_US
         * Swaps the z-order (front-to-back order) of the child objects at the two specified index positions in the child
         * list. All other child objects in the display object container remain in the same index positions.
         * @param index1 The index position of the first child object.
         * @param index2 The index position of the second child object.
         * @see #swapChildren()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param index1 第一个子对象的索引位置。
         * @param index2 第二个子对象的索引位置。
         * @see #swapChildren()
         * @version Lark 1.0
         * @platform Web,Native
         */
        swapChildrenAt(index1: number, index2: number): void;
        /**
         * @language en_US
         * Swaps the z-order (front-to-back order) of the two specified child objects. All other child objects in the
         * display object container remain in the same index positions.
         * @param child1 The first child object.
         * @param child2 The second child object.
         * @see #swapChildrenAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         * @see #swapChildrenAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        /**
         * @language en_US
         * Removes all child DisplayObject instances from the child list of the DisplayObjectContainer instance. The parent
         * property of the removed children is set to null , and the objects are garbage collected if no other references to the children exist.
         * @see #removeChild()
         * @see #removeChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         * @see #removeChild()
         * @see #removeChildAt()
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChildren(): void;
        /**
         * @language en_US
         * Determines whether or not the children of the object are touch, or user input device, enabled. If an object is
         * enabled, a user can interact with it by using a touch or user input device.
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定对象的子级是否支持触摸或用户输入设备。如果对象支持触摸或用户输入设备，用户可以通过使用触摸或用户输入设备与之交互。
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        touchChildren: boolean;
    }
}
declare module lark.sys {
    /**
     * @private
     * 平台实现输入文本的接口
     */
    interface ITextAdapter {
    }
}
declare module lark {
    /**
     * @language en_US
     * The StageScaleMode class provides values for the Stage.scaleMode property.
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * StageScaleMode 类为舞台缩放模式提供值。
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    class StageScaleMode {
        /**
         * @language en_US
         * Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the screen
         * changes. Cropping might occur if the screen is smaller than the content.<br/>
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the size of the screen.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
         * 在此模式下，舞台尺寸（Stage.stageWidth,Stage.stageHeight）始终跟播放器视口大小保持一致。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static NO_SCALE: string;
        /**
         * @language en_US
         * @private
         * Specifies that the entire application be visible in the specified area without distortion while maintaining the
         * original aspect ratio of the application. Borders can appear on two sides of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @private
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static SHOW_ALL: string;
        /**
         * @language en_US
         * Specifies that the entire application fill the specified area, without distortion but possibly with some cropping,
         * while maintaining the original aspect ratio of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static NO_BORDER: string;
        /**
         * @language en_US
         * Specifies that the entire application be visible in the specified area without trying to preserve the original
         * aspect ratio. Distortion can occur.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static EXACT_FIT: string;
        /**
         * @language en_US
         * Specifies that the width of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the height of the application might changes. Cropping might occur if the height of the screen is smaller than the content.
         * In this mode,the stage width always equals to the initial content width,but the stage height is determined by the content height
         * and the scaling factor of the stage width and the content width.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
         * 在此模式下，舞台宽度(Stage.stageWidth)始终等于初始化时外部传入的应用程序内容宽度。舞台高度(Stage.stageHeight)由当前的缩放比例与播放器视口高度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static FIXED_WIDTH: string;
        /**
         * @language en_US
         * Specifies that the height of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the width of the application might changes. Cropping might occur if the width of the screen is smaller than the content.
         * In this mode,the stage height always equals to the initial content height,but the stage width is determined by the content width
         * and the scaling factor of the stage height and the content height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
         * 在此模式下，舞台高度(Stage.stageHeight)始终等于初始化时外部传入的应用程序内容高度。舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static FIXED_HEIGHT: string;
    }
}
declare module lark.sys {
    /**
     * @private
     * 全局共享的RenderContext。通常用于交换缓存，测量文本或创建填充对象。
     */
    var sharedRenderContext: sys.RenderContext;
    /**
     * @private
     * surfaceFactory实例
     */
    var surfaceFactory: SurfaceFactory;
    /**
     * @private
     */
    interface SurfaceFactory {
        /**
         * @private
         * 从对象池取出或创建一个新的Surface实例
         * @param useOnce 表示对取出实例的使用是一次性的，用完后立即会释放。
         */
        create(useOnce?: boolean): Surface;
        /**
         * @private
         * 释放一个Surface实例
         * @param surface 要释放的Surface实例
         */
        release(surface: Surface): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The EventPhase class provides values for the eventPhase property of the Event class.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * EventPhase 可为 Event 类的 eventPhase 属性提供值。
     * @version Lark 1.0
     * @platform Web,Native
     */
    const enum EventPhase {
        /**
         * @language en_US
         * The capturing phase, which is the first phase of the event flow.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 捕获阶段。
         * @version Lark 1.0
         * @platform Web,Native
         */
        CAPTURING_PHASE = 1,
        /**
         * @language en_US
         * The target phase, which is the second phase of the event flow.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 目标阶段，是事件流的第二个阶段。
         * @version Lark 1.0
         * @platform Web,Native
         */
        AT_TARGET = 2,
        /**
         * @language en_US
         * The bubbling phase, which is the third phase of the event flow.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 冒泡阶段。
         * @version Lark 1.0
         * @platform Web,Native
         */
        BUBBLING_PHASE = 3,
    }
}
declare module lark.sys {
    /**
     * @private
     * 呈现最终绘图结果的画布
     */
    interface Surface extends BitmapData {
        /**
         * @private
         * 绘图上下文
         */
        renderContext: RenderContext;
    }
}
declare module lark {
    /**
     * @copy lark.Orientation
     */
    var Orientation: {
        new (): Orientation;
    };
    /**
     * @language en_US
     * Orientation monitor the orientation of the device, send CHANGE event when the orientation is changed
     *
     * @event lark.Event.CHANGE device's orientation is changed
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Orientation 监听设备方向的变化，当方向变化时派发 CHANGE 事件
     * @event lark.Event.CHANGE 设备方向改变时派发
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Orientation extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor the device's orientation
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备方向变化
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor the device's orientation
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备方向变化
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The IEventEmitter interface defines methods for adding or removing event listeners, checks whether specific types
     * of event listeners are registered, and emits events. Event targets are an important part of the Lark event model.
     * The event target serves as the focal point for how events flow through the display list hierarchy. When an event
     * such as a touch tap occurs, an event object is emitted into the event flow from the root of the display list.
     * The event object makes a round-trip journey to the event target, which is conceptually divided into three phases: <br/>
     * the capture phase includes the journey from the root to the last node before the event target's node; the target
     * phase includes only the event target node; and the bubbling phase includes any subsequent nodes encountered on the
     * return trip to the root of the display list.In general, the easiest way for a user-defined class to gain event
     * emitting capabilities is to extend EventEmitter. If this is impossible (that is, if the class is already
     * extending another class), you can instead implement the IEventEmitter interface, create an EventEmitter member,
     * and write simple hooks to route calls into the aggregated EventEmitter.
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * IEventEmitter 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * 事件目标是 Lark 事件模型的重要组成部分。事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生触摸轻拍事件时，
     * 会将事件对象调度到从显示列表根开始的事件流中。事件对象进行到事件目标的往返行程，在概念上，此往返行程被划分为三个阶段：<br/>
     * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括到显示列表的根的回程上遇到的任何后续节点。
     * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），
     * 则可以实现 IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的挂钩，将调用连接到聚合的 EventEmitter 中。
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface IEventEmitter extends LarkObject {
        /**
         * @language en_US
         * Registers an event listener object with an EventEmitter object so that the listener receives notification of an
         * event. You can register event listeners on all nodes in the display list for a specific type of event, phase,
         * and priority.After you successfully register an event listener, you cannot change its priority through additional
         * calls to on(). To change a listener's priority, you must first call removeListener(). Then you can register the
         * listener again with the new priority level.After the listener is registered, subsequent calls to on() with a
         * different value for either type or useCapture result in the creation of a separate listener registration. <br/>
         * When you no longer need an event listener, remove it by calling EventEmitter.removeListener(); otherwise, memory
         * problems might result. Objects with registered event listeners are not automatically removed from memory because
         * the garbage collector does not remove objects that still have references.Copying an EventEmitter instance does
         * not copy the event listeners attached to it. (If your newly created node needs an event listener, you must attach
         * the listener after creating the node.) However, if you move an EventEmitter instance, the event listeners attached
         * to it move along with it.If the event listener is being registered on a node while an event is also being processed
         * on this node, the event listener is not triggered during the current phase but may be triggered during a later phase
         * in the event flow, such as the bubbling phase.If an event listener is removed from a node while an event is being
         * processed on the node, it is still triggered by the current actions. After it is removed, the event listener is
         * never invoked again (unless it is registered again for future processing).
         * @param type The type of event.
         * @param listener The listener function that processes the event. This function must accept an event object as
         * its only parameter and must return nothing, as this example shows: function(evt:Event):void  The function can
         * have any name.
         * @param thisObject the listener function's "this"
         * @param useCapture Determines whether the listener works in the capture phase or the bubbling phases. If useCapture
         * is set to true, the listener processes the event only during the capture phase and not in the bubbling phase.
         * If useCapture is false, the listener processes the event only during the bubbling phase. To listen for the event
         * in all three phases, call on() twice, once with useCapture set to true, then again with useCapture set to false.
         * @param  priority The priority level of the event listener. Priorities are designated by a integer. The higher
         * the number, the higher the priority. All listeners with priority n are processed before listeners of priority n-1.
         * If two or more listeners share the same priority, they are processed in the order in which they were added.
         * The default priority is
         * @see #once()
         * @see #removeListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用 EventEmitter 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件、阶段和优先级在显示列表的所有节
         * 点上注册事件侦听器。成功注册一个事件侦听器后，无法通过额外调用 on() 来更改其优先级。要更改侦听器的优先级，必须
         * 先调用 removeListener()。然后，可以使用新的优先级再次注册该侦听器。注册该侦听器后，如果继续调用具有不同 type 或 useCapture
         * 值的 on()，则会创建单独的侦听器注册。<br/>
         * 如果不再需要某个事件侦听器，可调用 EventEmitter.removeListener()
         * 删除它；否则会产生内存问题。由于垃圾回收器不会删除仍包含引用的对象，因此不会从内存中自动删除使用已注册事件侦听器的对象。复制
         * EventEmitter 实例时并不复制其中附加的事件侦听器。（如果新近创建的节点需要一个事件侦听器，必须在创建该节点后附加该侦听器。）
         * 但是，如果移动 EventEmitter 实例，则其中附加的事件侦听器也会随之移动。如果在正在处理事件的节点上注册事件侦听器，则不会在当
         * 前阶段触发事件侦听器，但会在事件流的稍后阶段触发，如冒泡阶段。如果从正在处理事件的节点中删除事件侦听器，则该事件侦听器仍由当前操
         * 作触发。删除事件侦听器后，决不会再次调用该事件侦听器（除非再次注册以备将来处理）。
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param listener 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         * @see #once()
         * @see #removeListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * @language en_US
         * Registers an event listener object with an EventEmitter object so that the listener receives notification of an
         * event. Different from the on() method,the listener receives notification only once,and then it will be removed
         * automatically.
         * @param type The type of event.
         * @param listener The listener function that processes the event. This function must accept an event object as
         * its only parameter and must return nothing, as this example shows: function(evt:Event):void  The function can
         * have any name.
         * @param thisObject the listener function's "this"
         * @param useCapture Determines whether the listener works in the capture phase or the bubbling phases. If useCapture
         * is set to true, the listener processes the event only during the capture phase and not in the bubbling phase.
         * If useCapture is false, the listener processes the event only during the bubbling phase. To listen for the event
         * in all three phases, call on() twice, once with useCapture set to true, then again with useCapture set to false.
         * @param  priority The priority level of the event listener. Priorities are designated by a integer. The higher
         * the number, the higher the priority. All listeners with priority n are processed before listeners of priority n-1.
         * If two or more listeners share the same priority, they are processed in the order in which they were added.
         * The default priority is
         * @see #on()
         * @see #removeListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听。
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 once() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         * @see #on()
         * @see #removeListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        once(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * @language en_US
         * Removes a listener from the EventEmitter object. If there is no matching listener registered with the
         * EventEmitter object, a call to this method has no effect.
         * @param type The type of event.
         * @param listener The listener object to remove.
         * @param thisObject the listener function's "this"
         * @param useCapture Specifies whether the listener was registered for the capture phase or the bubbling phases.
         * If the listener was registered for both the capture phase and the bubbling phases, two calls to removeListener()
         * are required to remove both: one call with useCapture set to true, and another call with useCapture set to false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从 EventEmitter 对象中删除侦听器。如果没有向 EventEmitter 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         * @param type 事件的类型。
         * @param listener 要删除的侦听器对象
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 指出是为捕获阶段还是为冒泡阶段注册了侦听器。如果为捕获阶段以及冒泡阶段注册了侦听器，则需要对
         * removeListener() 进行两次调用才能将这两个侦听器删除：一次调用将 useCapture 设置为 true，另一次调用将 useCapture 设置为 false。。
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        /**
         * @language en_US
         * Checks whether the EventEmitter object has any listeners registered for a specific type of event. This allows
         * you to determine where an EventEmitter object has altered handling of an event type in the event flow hierarchy.
         * To determine whether a specific event type will actually trigger an event listener, use IEventEmitter.willTrigger().
         * The difference between hasListener() and willTrigger() is that hasListener() examines only the object to
         * which it belongs, whereas willTrigger() examines the entire event flow for the event specified by the type parameter.
         * @param type The type of event.
         * @returns A value of true if a listener of the specified type is registered; false otherwise.
         * @see #willTrigger()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检查 EventEmitter 对象是否为特定事件类型注册了任何侦听器。这样，您就可以确定 EventEmitter 对象在事件流层次结构中的哪个
         * 位置改变了对事件类型的处理。要确定特定事件类型是否确实会触发事件侦听器，请使用 IEventEmitter.willTrigger()。hasListener()
         * 与 willTrigger() 的区别是：hasListener() 只检查它所属的对象，而 willTrigger() 检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件的类型。
         * @returns 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         * @see #willTrigger()
         * @version Lark 1.0
         * @platform Web,Native
         */
        hasListener(type: string): boolean;
        /**
         * @language en_US
         * Emits an event into the event flow. The event target is the EventEmitter object upon which emit() is called.
         * @param event The event object emitted into the event flow.
         * @returns A value of true unless preventDefault() is called on the event, in which case it returns false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将事件分派到事件流中。事件目标是对其调用 emit() 方法的 EventEmitter 对象。
         * @param event 调度到事件流中的 Event 对象。
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         * @version Lark 1.0
         * @platform Web,Native
         */
        emit(event: Event): boolean;
        /**
         * @language en_US
         * Checks whether an event listener is registered with this EventEmitter object or any of its ancestors for the
         * specified event type. This method returns true if an event listener is triggered during any phase of the event
         * flow when an event of the specified type is emitted to this EventEmitter object or any of its descendants.
         * @param type The type of event.
         * @returns A value of true if a listener of the specified type will be triggered; false otherwise.
         * @see #hasListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检查是否用此 EventEmitter 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventEmitter 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasListener() 与 willTrigger() 方法的区别是：hasListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件类型
         * @returns 是否注册过监听器，如果注册过返回true，反之返回false
         * @see #hasListener()
         * @version Lark 1.0
         * @platform Web,Native
         */
        willTrigger(type: string): boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * Writes an error message to the console if the assertion is false. If the assertion is true, nothing will happen.
     * @param assertion Any boolean expression. If the assertion is false, the message will get written to the console.
     * @param message the message written to the console
     * @param optionalParams the extra messages written to the console
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 判断参数assertion是否为true，若为false则抛出异常并且在console输出相应信息，反之什么也不做。
     * @param assertion 一个 boolean 表达式，若结果为false，则抛出错误并输出信息。
     * @param message 要输出到控制台的信息
     * @param optionalParams 要输出到控制台的额外可选信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    function assert(assertion?: boolean, message?: string, ...optionalParams: any[]): void;
    /**
     * @language en_US
     * Writes a warning message to the console.
     * @param message the message written to the console
     * @param optionalParams the extra messages written to the console
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 输出一个警告信息到控制台。
     * @param message 要输出到控制台的信息
     * @param optionalParams 要输出到控制台的额外信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    function warn(message?: any, ...optionalParams: any[]): void;
    /**
     * @language en_US
     * Writes an error message to the console.
     * @param message the message written to the console
     * @param optionalParams the extra messages written to the console
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 输出一个错误信息到控制台。
     * @param message 要输出到控制台的信息
     * @param optionalParams 要输出到控制台的额外信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    function error(message?: any, ...optionalParams: any[]): void;
    /**
     * @language en_US
     * Writes an message to the console.
     * @param message the message written to the console
     * @param optionalParams the extra messages written to the console
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 输出一个日志信息到控制台。
     * @param message 要输出到控制台的信息
     * @param optionalParams 要输出到控制台的额外信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    function log(message?: any, ...optionalParams: any[]): void;
}
declare module lark.sys {
    /**
     * @private
     * 设备屏幕
     */
    interface Screen {
        /**
         * @private
         * 更新屏幕视口尺寸
         */
        updateScreenSize(): any;
    }
}
declare module lark {
    /**
     * @language en_US
     * The HorizontalAlign class defines the possible values for the horizontal alignment.
     * @see lark.TextField#textAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HorizontalAlign 类为水平对齐方式定义可能的值。
     * @see lark.TextField#textAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    class HorizontalAlign {
        /**
         * @language en_US
         * Horizontally align content to the left of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的左侧对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static LEFT: string;
        /**
         * @language en_US
         * Horizontally align content to the right of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的右侧对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static RIGHT: string;
        /**
         * @language en_US
         * Horizontally align content in the center of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在容器的水平中心对齐内容。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static CENTER: string;
    }
}
declare module lark.sys {
    /**
     * @private
     */
    interface Renderable extends LarkObject {
    }
}
declare module lark {
    /**
     * @language en_US
     * Helper class to measure the width of text.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 用于文本宽度测量的辅助类
     * @version Lark 1.0
     * @platform Web,Native
     */
    class TextMeasurer {
        /**
         * @language en_US
         * Returns the width of the text with some specific styles.
         * @param text the text to be measured.
         * @param font text font style of the given text.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 测量文本在指定样式下的宽度。
         * @param text 要测量的文本内容。
         * @param font 文本的样式值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static measureText(text: string, font: string): number;
    }
}
declare module lark.sys {
    /**
     * @private
     * 绘图上下文
     */
    interface RenderContext {
        /**
         * @private
         * 与绘图上线文关联的画布实例
         */
        surface: Surface;
        /**
         * @private
         * 设置新图像如何绘制到已有的图像上的规制
         */
        globalCompositeOperation: string;
        /**
         * @private
         * 设置接下来绘图填充的整体透明度
         */
        globalAlpha: number;
        /**
         * @private
         * 用于表示剪切斜接的极限值的数字。
         * @default 10
         */
        miterLimit: number;
        /**
         * @private
         * 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"butt": 线段末端以方形结束。</li>
         * <li>"round": 线段末端以圆形结束。</li>
         * <li>"square": 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。</li>
         * </ul>
         * @default "butt"
         */
        lineCap: string;
        /**
         * @private
         * 指定用于拐角的连接外观的类型,有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"round": 圆角连接</li>
         * <li>"bevel": 斜角连接。</li>
         * <li>"miter": 尖角连接。当使用尖角模式时，还可以同时使用 miterLimit 参数限制尖角的长度。</li>
         * </ul>
         * @default "miter"
         */
        lineJoin: string;
        /**
         * @private
         * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
         * @default 1
         */
        lineWidth: number;
        /**
         * @private
         * 设置要在图形边线填充的颜色或样式
         * @default "#000000"
         */
        strokeStyle: any;
        /**
         * @private
         * 设置要在图形内部填充的颜色或样式
         * @default "#000000"
         */
        fillStyle: any;
        /**
         * @private
         * 控制在缩放时是否对位图进行平滑处理。
         * @default true
         */
        imageSmoothingEnabled: boolean;
        /**
         * @private
         * 文本的对齐方式的属性,有5个可能的值，分别是：<br/>
         * <ul>
         * <li>"left" 文本左对齐。</li>
         * <li>"right" 文本右对齐。</li>
         * <li>"center" 文本居中对齐。</li>
         * <li>"start" 文本对齐界线开始的地方 （对于从左向右阅读的语言使用左对齐，对从右向左的阅读的语言使用右对齐）。</li>
         * <li>"end" 文本对齐界线结束的地方 （对于从左向右阅读的语言使用右对齐，对从右向左的阅读的语言使用左对齐）。</li>
         * </ul>
         * @default "start"
         */
        textAlign: string;
        /**
         * @private
         * 决定文字垂直方向的对齐方式。有6个可能的值，分别是：<br/>
         * <ul>
         * <li>"top" 文本基线在文本块的顶部。</li>
         * <li>"hanging" 文本基线是悬挂基线。</li>
         * <li>"middle" 文本基线在文本块的中间。</li>
         * <li>"alphabetic" 文本基线是标准的字母基线。</li>
         * <li>"ideographic" 文字基线是表意字基线；如果字符本身超出了alphabetic 基线，那么ideograhpic基线位置在字符本身的底部。</li>
         * <li>"bottom" 文本基线在文本块的底部。 与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母。</li>
         * </ul>
         * @default "alphabetic"
         */
        textBaseline: string;
        /**
         * @private
         * 当前的字体样式
         */
        font: string;
        /**
         * @private
         * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
         * @param x 圆弧中心（圆心）的 x 轴坐标。
         * @param y 圆弧中心（圆心）的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
         * @param endAngle 圆弧的重点， 单位以弧度表示。
         * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
        /**
         * @private
         * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
         * @param cpx 控制点的 x 轴坐标。
         * @param cpy 控制点的 y 轴坐标。
         * @param x 终点的 x 轴坐标。
         * @param y 终点的 y 轴坐标。
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * @private
         * 使用直线连接子路径的终点到x，y坐标。
         * @param x 直线终点的 x 轴坐标。
         * @param y 直线终点的 y 轴坐标。
         */
        lineTo(x: number, y: number): void;
        /**
         * @private
         * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
         * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
         * "nonzero": 非零环绕规则， 默认的规则。
         * "evenodd": 奇偶环绕规则。
         */
        fill(fillRule?: string): void;
        /**
         * @private
         * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
         */
        closePath(): void;
        /**
         * @private
         * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         */
        rect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 将一个新的子路径的起始点移动到(x，y)坐标
         * @param x 点的 x 轴
         * @param y 点的 y 轴
         */
        moveTo(x: number, y: number): void;
        /**
         * @private
         * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
         * @param x 矩形起始点的 x 轴坐标。
         * @param y 矩形起始点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         */
        fillRect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
         * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
         * @param cp1x 第一个控制点的 x 轴坐标。
         * @param cp1y 第一个控制点的 y 轴坐标。
         * @param cp2x 第二个控制点的 x 轴坐标。
         * @param cp2y 第二个控制点的 y 轴坐标。
         * @param x 结束点的 x 轴坐标。
         * @param y 结束点的 y 轴坐标。
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * @private
         * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
         */
        stroke(): void;
        /**
         * @private
         * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         */
        strokeRect(x: number, y: number, w: number, h: number): void;
        /**
         * @private
         * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
         */
        beginPath(): void;
        /**
         * @private
         * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
         * @param x1 第一个控制点的 x 轴坐标。
         * @param y1 第一个控制点的 y 轴坐标。
         * @param x2 第二个控制点的 x 轴坐标。
         * @param y2 第二个控制点的 y 轴坐标。
         * @param radius 圆弧的半径。
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * @private
         * 使用方法参数描述的矩阵多次叠加当前的变换矩阵。
         * @param a 水平缩放。
         * @param b 水平倾斜。
         * @param c 垂直倾斜。
         * @param d 垂直缩放。
         * @param tx 水平移动。
         * @param ty 垂直移动。
         */
        transform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        /**
         * @private
         * 通过在网格中移动 surface 和 surface 原点 x 水平方向、原点 y 垂直方向，添加平移变换
         * @param x 水平移动。
         * @param y 垂直移动。
         */
        translate(x: number, y: number): void;
        /**
         * @private
         * 根据 x 水平方向和 y 垂直方向，为 surface 单位添加缩放变换。
         * @param x 水平方向的缩放因子。
         * @param y 垂直方向的缩放因子。
         */
        scale(x: number, y: number): void;
        /**
         * @private
         * 在变换矩阵中增加旋转，角度变量表示一个顺时针旋转角度并且用弧度表示。
         * @param angle 顺时针旋转的弧度。
         */
        rotate(angle: number): void;
        /**
         * @private
         * 恢复到最近的绘制样式状态，此状态是通过 save() 保存到”状态栈“中最新的元素。
         */
        restore(): void;
        /**
         * @private
         * 使用栈保存当前的绘画样式状态，你可以使用 restore() 恢复任何改变。
         */
        save(): void;
        /**
         * @private
         * 从当前路径创建一个剪切路径。在  clip() 调用之后，绘制的所有信息只会出现在剪切路径内部。
         */
        clip(fillRule?: string): void;
        /**
         * @private
         * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * @private
         * 重新设置当前的变换为单位矩阵，并使用同样的变量调用 transform() 方法。
         * @param a 水平缩放。
         * @param b 水平倾斜。
         * @param c 垂直倾斜。
         * @param d 垂直缩放。
         * @param tx 水平移动。
         * @param ty 垂直移动。
         */
        setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        /**
         * @private
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
         * @param x0 起点的 x 轴坐标。
         * @param y0 起点的 y 轴坐标。
         * @param x1 终点的 x 轴坐标。
         * @param y1 终点的 y 轴坐标。
         */
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): GraphicsGradient;
        /**
         * @private
         * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
         * @param x0 开始圆形的 x 轴坐标。
         * @param y0 开始圆形的 y 轴坐标。
         * @param r0 开始圆形的半径。
         * @param x1 结束圆形的 x 轴坐标。
         * @param y1 结束圆形的 y 轴坐标。
         * @param r1 结束圆形的半径。
         */
        createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): GraphicsGradient;
        /**
         * @private
         * 在(x,y)位置绘制（填充）文本。
         */
        fillText(text: string, x: number, y: number, maxWidth?: number): void;
        /**
         * @private
         * 测量指定文本宽度，返回 TextMetrics 对象。
         */
        measureText(text: string): TextMetrics;
        /**
         * @private
         * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
         * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
         */
        drawImage(image: BitmapData, offsetX: number, offsetY: number, width?: number, height?: number, surfaceOffsetX?: number, surfaceOffsetY?: number, surfaceImageWidth?: number, surfaceImageHeight?: number): void;
        /**
         * @private
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         */
        createPattern(image: BitmapData, repetition: string): GraphicsPattern;
        /**
         * @private
         * 返回一个 ImageData 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
         */
        getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    }
    /**
     * @private
     */
    interface TextMetrics {
        /**
         * @private
         */
        width: number;
    }
    /**
     * @private
     */
    interface ImageData {
        /**
         * @private
         */
        width: number;
        /**
         * @private
         */
        data: Uint8Array;
        /**
         * @private
         */
        height: number;
    }
}
declare module lark {
    /**
     * @language en_US
     * The VerticalAlign class defines the possible values for the vertical alignment.
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * VerticalAlign 类为垂直对齐方式定义可能的值。
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    class VerticalAlign {
        /**
         * @language en_US
         * Vertically align content to the top of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的顶部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOP: string;
        /**
         * @language en_US
         * Vertically align content to the bottom of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的底部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static BOTTOM: string;
        /**
         * @language en_US
         * Vertically align content in the middle of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在容器的垂直中心对齐内容。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static MIDDLE: string;
    }
}
declare module lark.sys {
    /**
     * @private
     * OrientationMode 类为舞台初始旋转模式提供值。
     */
    class OrientationMode {
        /**
         * @private
         * 适配屏幕
         */
        static AUTO: string;
        /**
         * @private
         * 默认竖屏
         */
        static PORTRAIT: string;
        /**
         * @private
         * 默认横屏，舞台顺时针旋转90度
         */
        static LANDSCAPE: string;
        /**
         * @private
         * 默认横屏，舞台逆时针旋转90度
         */
        static LANDSCAPE_FLIPPED: string;
    }
}
declare module lark {
    /**
     * @language en_US
     * The XMLNode class is the base class for all xml node.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XML节点基类
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface XMLNode {
        /**
         * @language en_US
         * a integer representing the type of the node, 1：XML，2：XMLAttribute，3：XMLText
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点类型，1：XML，2：XMLAttribute，3：XMLText
         * @version Lark 1.0
         * @platform Web,Native
         */
        nodeType: number;
        /**
         * @language en_US
         * the parent node of this xml node.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点所属的父级节点
         * @version Lark 1.0
         * @platform Web,Native
         */
        parent: XML;
    }
    /**
     * @language en_US
     * The XML class contains properties for working with XML objects.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XML 类包含用于处理 XML 对象的属性。
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface XML extends XMLNode {
        /**
         * @language en_US
         * the attributes of this xml node.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前节点上的属性列表
         * @version Lark 1.0
         * @platform Web,Native
         */
        attributes: any;
        /**
         * @language en_US
         * the children of the xml node.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前节点的子节点列表
         * @version Lark 1.0
         * @platform Web,Native
         */
        children: XMLNode[];
        /**
         * @language en_US
         * the full name of this xml node. For example,the name of <s:Button/> is "s:Button".
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点完整名称。例如节点 <s:Button/> 的 name 为："s:Button"
         * @version Lark 1.0
         * @platform Web,Native
         */
        name: string;
        /**
         * @language en_US
         * thie namesapce prefix of this xml node.For example,the prefix of <s:Button/> is "s".
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点的命名空间前缀。例如节点 <s:Button/> 的 prefix 为：s
         * @version Lark 1.0
         * @platform Web,Native
         */
        prefix: string;
        /**
         * @language en_US
         * the local name of this xml node. For example,the local name of <s:Button/> is "Button".
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点的本地名称。例如节点 <s:Button/> 的 localName 为：Button
         * @version Lark 1.0
         * @platform Web,Native
         */
        localName: string;
        /**
         * @language en_US
         * the namesapce uri of this xml node.For example,the namespace uri of <s:Skin xmlns:s="http://ns.egret.com/swan"/> is "http://ns.egret.com/swan".
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 节点的命名空间地址。例如节点 <s:Skin xmlns:s="http://ns.egret.com/swan"/> 的 namespace 为： http://ns.egret.com/swan
         * @version Lark 1.0
         * @platform Web,Native
         */
        namespace: string;
    }
    /**
     * @language en_US
     * The XMLText class represents a string node in the XML.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XMLText 类表示在XML中的文本节点
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface XMLText extends XMLNode {
        /**
         * @language en_US
         * the text content
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本内容
         * @version Lark 1.0
         * @platform Web,Native
         */
        text: string;
    }
    /**
     * @language en_US
     * The XML class contains properties for working with XML objects.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XML 类包含用于处理 XML 对象的属性。
     * @version Lark 1.0
     * @platform Web,Native
     */
    var XML: {
        /**
         * @language en_US
         * parses a text to XML instance.
         * @param text the text to be parsed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 解析字符串为XML对象
         * @param text 要解析的XML对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        parse(text: string): XML;
    };
}
declare module lark.sys {
    /**
     * @private
     * 屏幕适配器接口，当播放器视口尺寸改变时，屏幕适配器将被用于计算当前对应的舞台显示尺寸。
     */
    interface IScreenAdapter {
        /**
         * @private
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
     * @private
     * 舞台显示尺寸数据
     */
    interface StageDisplaySize {
        /**
         * @private
         * 舞台宽度
         */
        stageWidth: number;
        /**
         * @private
         * 舞台高度
         */
        stageHeight: number;
        /**
         * @private
         * 显示宽度，若跟舞台宽度不同，将会产生缩放。
         */
        displayWidth: number;
        /**
         * @private
         * 显示高度，若跟舞台高度不同，将会产生缩放。
         */
        displayHeight: number;
    }
}
declare module lark {
    /**
     * @language en_US
     * A BitmapData object contains an array of pixel data. This data can represent either a fully opaque bitmap or a
     * transparent bitmap that contains alpha channel data. Either type of BitmapData object is stored as a buffer of 32-bit
     * integers. Each 32-bit integer determines the properties of a single pixel in the bitmap.<br/>
     * Each 32-bit integer is a combination of four 8-bit channel values (from 0 to 255) that describe the alpha transparency
     * and the red, green, and blue (ARGB) values of the pixel. (For ARGB values, the most significant byte represents the
     * alpha channel value, followed by red, green, and blue.)
     * @see lark.Bitmap
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * BitmapData 对象是一个包含像素数据的数组。此数据可以表示完全不透明的位图，或表示包含 Alpha 通道数据的透明位图。
     * 以上任一类型的 BitmapData 对象都作为 32 位整数的缓冲区进行存储。每个 32 位整数确定位图中单个像素的属性。<br/>
     * 每个 32 位整数都是四个 8 位通道值（从 0 到 255）的组合，这些值描述像素的 Alpha 透明度以及红色、绿色、蓝色 (ARGB) 值。
     * （对于 ARGB 值，最高有效字节代表 Alpha 通道值，其后的有效字节分别代表红色、绿色和蓝色通道值。）
     * @see lark.Bitmap
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface BitmapData extends LarkObject {
        /**
         * @language en_US
         * The width of the bitmap image in pixels.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 位图图像的宽度，以像素为单位。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        width: number;
        /**
         * @language en_US
         * The height of the bitmap image in pixels.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 位图图像的高度，以像素为单位。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        height: number;
    }
}
declare module lark {
    /**
     * @language en_US
     * The Loader class is used to load image (JPG, PNG, or GIF) files. Use the load() method to initiate loading.
     * The loaded image data is in the data property of ImageLoader.
     * @event lark.Event.COMPLETE Emitted when the net request is complete.
     * @event lark.Event.IO_ERROR Emitted when the net request is failed.
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/net/ImageLoaderExample.ts
     */
    /**
     * @language zh_CN
     * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
     * @event lark.Event.COMPLETE 加载完成
     * @event lark.Event.IO_ERROR 加载失败
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/net/ImageLoaderExample.ts
     */
    interface ImageLoader extends EventEmitter {
        /**
         * @language en_US
         * The data received from the load operation.
         * @default null
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用 load() 方法加载成功的 BitmapData 图像数据。
         * @default null
         * @version Lark 1.0
         * @platform Web,Native
         */
        data: BitmapData;
        /**
         * @language en_US
         * Specifies whether or not cross-site Access-Control requests should be made when loading a image from foreign origins.<br/>
         * possible values are:"anonymous","use-credentials" or null.
         * @default null
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。<br/>
         * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
         * @version Lark 1.0
         * @platform Web,Native
         */
        crossOrigin: string;
        /**
         * @language en_US
         * start a load operation。<br/>
         * Note: Calling this method for an already active request (one for which load() has already been
         * called) will abort the last load operation immediately.
         * @param url 要加载的图像文件的地址。
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 启动一次图像加载。<br/>
         * 注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
         * @param url 要加载的图像文件的地址。
         * @version Lark 1.0
         * @platform Web,Native
         */
        load(url: string): void;
    }
    /**
     * @language en_US
     * Creates a ImageLoader object
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 创建一个 ImageLoader 实例
     * @version Lark 1.0
     * @platform Web,Native
     */
    var ImageLoader: {
        new (): ImageLoader;
    };
}
declare module lark {
    /**
     * @language en_US
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     * @example
     * <pre>
     *  lark.getQualifiedClassName(lark.DisplayObject) //return "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回对象的完全限定类名。
     * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
     * （如number)和类对象
     * @returns 包含完全限定类名称的字符串。
     * @example
     * <pre>
     *  lark.getQualifiedClassName(lark.DisplayObject) //返回 "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getQualifiedClassName(value: any): string;
}
declare module lark {
    /**
     * @language en_US
     * The Sound class lets you work with sound in an application.
     * The Sound class lets you create a Sound object, load and play an external audio file into that object.
     * More detailed control of the sound is performed through the SoundChannel
     *
     * @event egret.Event.COMPLETE Emit when the audio resource is loaded and ready to play
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Sound 允许您在应用程序中使用声音。使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
     * 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
     *
     * @event egret.Event.COMPLETE 音频加载完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Sound extends IEventEmitter {
        /**
         * @language en_US
         * Initiates loading of an external audio file from the specified URL.
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 启动从指定 URL 加载外部音频文件的过程。
         * @param url 需要加载的音频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        load(url?: string): void;
        /**
         * @language en_US
         * Generates a new SoundChannel object to play back the sound.
         * @param startTime The initial position in seconds at which playback should start, (default = 0)
         * @param loop Defines should play the audio again when the audio is ended. (default = false)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 生成一个新的 SoundChannel 对象来播放该声音。此方法返回 SoundChannel 对象，访问该对象可停止声音调整音量。
         * @param startTime 应开始播放的初始位置（以秒为单位），默认值是 0
         * @param loop 是否需要循环播放，默认值是 false
         * @version Lark 1.0
         * @platform Web,Native
         */
        play(startTime?: number, loop?: boolean): SoundChannel;
        /**
         * @language en_US
         * Closes the stream, causing any download of data to cease
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关闭该流，从而停止所有数据的下载。
         * @version Lark 1.0
         * @platform Web,Native
         */
        close(): void;
    }
    /**
     * @copy lark.Sound
     */
    var Sound: {
        /**
         * @language en_US
         * Create Sound object, load an external audio file and play
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建 Sound 对象、将外部音频文件加载到该对象并播放该文件
         * @param url 需要加载的音频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        new (url?: string): Sound;
    };
}
declare module lark {
    /** @language en_US
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     * @example
     * <pre>
     *  lark.getQualifiedSuperclassName(lark.Bitmap) //return "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回 value 参数指定的对象的基类的完全限定类名。
     * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
     * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
     * @example
     * <pre>
     *  lark.getQualifiedSuperclassName(lark.Sprite) //返回 "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getQualifiedSuperclassName(value: any): string;
}
declare module lark {
    /**
     * @language en_US
     * The SoundChannel class controls a sound in an application.
     * Every sound is assigned to a sound channel, and the application
     * can have multiple sound channels that are mixed together.
     * The SoundChannel class contains a stop() method, properties for
     * set the volume of the channel
     *
     * @event egret.Event.COMPLETE Emit when a sound has finished playing
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
    * @language zh_CN
     * SoundChannel 类控制应用程序中的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * SoundChannel 类包含 stop() 方法、用于设置音量和监视播放进度的属性。
     *
     * @event egret.Event.ENDED 音频播放完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
    */
    interface SoundChannel extends IEventEmitter {
        /**
         * @language en_US
         * The volume, ranging from 0 (silent) to 1 (full volume).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 音量范围从 0（静音）至 1（最大音量）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        volume: number;
        /**
         * @language en_US
         *  When the sound is playing, the position property indicates
         * in seconds the current point that is being played in the sound file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当播放声音时，position 属性表示声音文件中当前播放的位置（以秒为单位）
         * @version Lark 1.0
         * @platform Web,Native
         */
        position: number;
        /**
         * @language en_US
         * Stops the sound playing in the channel.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止在该声道中播放声音。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * Indicates whether an object is a instance of the class or interface specified as the parameter.This method is similar
     * to the instanceOf operator which indicate whether an object is a instance of the specific class,besides, it can indicate
     * whether an object is a instance of the specific interface.
     * @param instance the instance to be checked.
     * @param typeName the string value representing a specific class or interface.
     * @returns A value of true if the object is a instance of the class or interface specified as the parameter.
     * @example
     * <pre>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,"lark.Sprite"))  //true
     *     lark.log(lark.is(instance,"lark.DisplayObjectContainer"))  //true
     *     lark.log(lark.is(instance,"lark.Bitmap"))  //false
     * </pre>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 检查指定对象是否为 Lark 框架内指定接口或类或其子类的实例。此方法与使用 instanceOf 关键字作用类似，但除了判断类定义也能判断接口的实现。
     * @param instance 要判断的实例。
     * @param typeName 类或接口的完全名称.
     * @returns 返回true表示当前对象是指定类或接口的实例。
     * @example
     * <pre>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,"lark.Sprite"))  //true
     *     lark.log(lark.is(instance,"lark.DisplayObjectContainer"))  //true
     *     lark.log(lark.is(instance,"lark.Bitmap"))  //false
     * </pre>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    function is(instance: any, typeName: string): boolean;
}
declare module lark {
    /**
     * @language en_US
     * The Video class lets you work with video in an application.
     * The Video class lets you create a Video object, load and play an external video file into that object.
     * Note: On most mobile device, the video is playback in the full screen mode.<br/>
     *
     * @event egret.Event.COMPLETE Emit when the video resource is loaded and ready to play
     * @event egret.Event.ENDED Emit when the video playback ended
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Video 允许您在应用程序中使用视频。使用 Video 类可以创建 Video 对象、将外部视频文件加载到该对象并播放该文件。<br/>
     * 注意: 在大多数移动设备中，视频是强制全屏播放的，所以你可以直接调用 play() 方法全屏播放视频，不用将它绘制在Stage中。
     *
     * @event egret.Event.COMPLETE 视频加载完成时抛出
     * @event egret.Event.ENDED 视频播放完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Video extends DisplayObject {
        /**
         * @language en_US
         * Initiates loading of an external video file from the specified URL.
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 启动从指定 URL 加载外部视频文件的过程。
         * @param url 需要加载的视频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        load(url?: string): void;
        /**
         * @language en_US
         * Play back the video.
         * @param startTime The initial position in seconds at which playback should start, (default = 0)
         * @param loop Defines should play the video again when the video is ended. (default = false)
         * @param fullscreen Defines should play the video in fullscreen mode. (default = false)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 播放该视频
         * @param startTime 应开始播放的初始位置（以秒为单位），默认值是视频上次结束的位置
         * @param loop 是否需要循环播放，默认值是 false
         * @param fullscreen 是否需要全屏播放，默认值是 false
         * @version Lark 1.0
         * @platform Web,Native
         */
        play(startTime?: number, loop?: boolean): any;
        /**
         * @language en_US
         * Closes the stream, causing any download of data to cease
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关闭该流，从而停止所有数据的下载。
         * @version Lark 1.0
         * @platform Web,Native
         */
        close(): void;
        /**
         * @language en_US
         * The URL of the video you want to play.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 想要播放的视频的URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        src: string;
        /**
         * @language en_US
         * The URL of an image you want to display before the video is loaded or video cannot been draw on the canvas on some mobile device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 视频加载前，或者在不支持将 video 画在 canvas 的设备上，想要显示的视频截图地址。
         * @version Lark 1.0
         * @platform Web,Native
         */
        poster: string;
        /**
         * @language en_US
         * Should play the video in fullscreen mode (default = true).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否全屏播放这个视频（默认值是 true）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        fullscreen: boolean;
        /**
         * @language en_US
         * The volume, ranging from 0 (silent) to 1 (full volume).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 音量范围从 0（静音）至 1（最大音量）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        volume: number;
        /**
         * @language en_US
         * When the video is playing, the position property indicates
         * in seconds the current point that is being played in the video file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当播放视频时，position 属性表示视频文件中当前播放的位置（以秒为单位）
         * @version Lark 1.0
         * @platform Web,Native
         */
        position: number;
        /**
         * @language en_US
         * Pause the video playing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 暂停播放。
         * @version Lark 1.0
         * @platform Web,Native
         */
        pause(): void;
        /**
         * @language en_US
         * Get bitmapData of the video file, you can use the video as bitmapData on the stage.
         * Note: On most mobile device, the video is playback in the full screen mode.
         * So you can just use the play() method instead of draw it on the Stage
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  获取视频的 bitmapData, 你可以将视频绘制到舞台上。
         * 注意： 在大多数移动设备中，视频是全屏播放的，所以你可以直接调用 play() 方法全屏播放视频，不用将它绘制在Stage中。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bitmapData: BitmapData;
    }
    var Video: {
        new (src?: string): Video;
    };
}
declare module lark {
    /**
     * @language en_US
     * The HttpMethod class provides values that specify whether the HttpRequest object should use the POST method
     * or the GET method when sending data to a server.
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HttpRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
     * HttpRequest 对象应使用 POST 方法还是 GET 方法。
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    class HttpMethod {
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a GET.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 HttpRequest 对象是一个 GET。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static GET: string;
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a POST.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 HttpRequest 对象是一个 POST。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static POST: string;
    }
}
declare module lark {
    /**
     * @language en_US
     * Register and start a timer,which will notify the callback method at a rate of 60 FPS ,and pass the current time stamp as parameters.<br/>
     * Note: After the registration,it will notify the callback method continuously,you can call the stopTick () method to stop it.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Lark framework was initialized. If the return value of this method is true, it will force Lark runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳。注意：注册后将会持续触发回调方法，若要停止回调，需要手动调用stopTick()方法。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function startTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
}
declare module lark {
    /**
     * @language en_US
     * The HttpResponseType class provides values that specify how downloaded data is received.
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * URLLoaderDataFormat 类提供了一些用于指定如何接收已下载数据的值。
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    class HttpResponseType {
        /**
         * @language en_US
         * Specifies that downloaded data is received as text. This is the default value of HttpRequest.responseType
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回字符串。HttpRequest.responseType属性的默认值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TEXT: string;
        /**
         * @language en_US
         * Specifies that downloaded data is received as raw binary data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回二进制的ArrayBuffer对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ARRAY_BUFFER: string;
    }
}
declare module lark {
    /**
     * @private
     */
    var $START_TIME: number;
    /**
     * @language en_US
     * Used to compute relative time.this method returns the number of milliseconds since the Lark framework was initialized
     * @returns The number of milliseconds since the Lark framework was initialized
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 用于计算相对时间。此方法返回自启动 Lark 框架以来经过的毫秒数。
     * @returns 启动 Lark 框架以来经过的毫秒数。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getTimer(): number;
}
declare module lark {
    /**
     * @language en_US
     * The HttpRequest class downloads data from a URL as text or binary data. It is useful for downloading text files,
     * XML, or other information to be used in a dynamic, data-driven application. A HttpRequest object downloads all
     * of the data from a URL before making it available to code in the applications. It sends out notifications about
     * the progress of the download, which you can monitor through the bytesLoaded and bytesTotal properties,
     * as well as through emitted events.
     * @event lark.Event.COMPLETE Emitted when the net request is complete.
     * @event lark.Event.IO_ERROR Emitted when the net request is failed.
     * @event lark.ProgressEvent.PROGRESS Emitted when data is received as the download operation progresses.
     * @see lark.HttpMethod
     * @see lark.HttpResponseType
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HttpRequest 类以文本或二进制数据的形式从 URL 下载数据。
     * HttpRequest 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
     * 通过 bytesLoaded 和 bytesTotal 属性以及已调度的事件，可以监视下载进度。
     * @event lark.Event.COMPLETE 加载完成
     * @event lark.Event.IO_ERROR 加载失败
     * @event lark.ProgressEvent.PROGRESS 加载进度，可通过event.bytesLoaded和event.bytesTotal统计进度信息。
     * @see lark.HttpMethod
     * @see lark.HttpResponseType
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface HttpRequest extends EventEmitter {
        /**
         * @language en_US
         * The data received from the load operation.  The format of the data depends on the setting of the responseType property.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 本次请求返回的数据，数据类型根据 responseType 设置的值确定。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        response: any;
        /**
         * @language en_US
         * Controls whether the downloaded data is received as text (HttpResponseType.TEXT) or raw binary data (HttpResponseType.ArrayBuffer)<br/>
         * Note:If you attempt to set this property to an invalid value, Lark runtime set the value to HttpResponseType.TEXT.
         * @default lark.HttpResponseType.TEXT
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置返回的数据格式为文本（HttpResponseType.TEXT）还是二进制数据（HttpResponseType.ArrayBuffer）<br/>
         * 注意：若尝试设置此属性为一个非法的值，运行时将使用HttpResponseType.TEXT。
         * @default lark.HttpResponseType.TEXT
         * @version Lark 1.0
         * @platform Web,Native
         */
        responseType: string;
        /**
         * @language en_US
         * indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies
         * or authorization headers. (This never affects same-site requests.)
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。(这个标志不会影响同站的请求)
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        withCredentials: boolean;
        /**
         * @language en_US
         * Initializes a request.<br/>
         * Note: Calling this method for an already active request (one for which open() or openRequest() has already been
         * called) is the equivalent of calling abort().
         * @param url The URL to send the request to.
         * @param method The HTTP method to use, please use the const value in the HttpMethod class.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 初始化一个请求.<br/>
         * 注意: 若在已经发出请求的对象上调用此方法，相当于立即调用abort().
         * @param url 该请求所要访问的URL该请求所要访问的URL
         * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
         * @version Lark 1.0
         * @platform Web,Native
         */
        open(url: string, method?: string): void;
        /**
         * @language en_US
         * Sends the request.
         * @param data the data to send.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 发送请求.
         * @param data 需要发送的数据
         * @version Lark 1.0
         * @platform Web,Native
         */
        send(data?: any): void;
        /**
         * @language en_US
         * Aborts the request if it has already been sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果请求已经被发送,则立刻中止请求.
         * @version Lark 1.0
         * @platform Web,Native
         */
        abort(): void;
        /**
         * @language en_US
         * Returns all the response headers as a string, or null if no response has been received.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
         * @version Lark 1.0
         * @platform Web,Native
         */
        getAllResponseHeaders(): string;
        /**
         * @language en_US
         * Sets the value of an HTTP request header. You must call setRequestHeader() after open().
         * @param header The name of the header whose value is to be set.
         * @param value The value to set as the body of the header.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
         * @param header 将要被赋值的请求头名称.
         * @param value 给指定的请求头赋的值.
         * @version Lark 1.0
         * @platform Web,Native
         */
        setRequestHeader(header: string, value: string): void;
        /**
         * @language en_US
         * Returns the string containing the text of the specified header, or null if either the response has not yet been
         * received or the header doesn't exist in the response.
         * @param header The name of the header whose value is to be get.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
         * @param header 要返回的响应头名称
         * @version Lark 1.0
         * @platform Web,Native
         */
        getResponseHeader(header: string): string;
    }
    /**
     * @language en_US
     * Creates a HttpRequest object.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 创建一个 HttpRequest 实例。
     * @version Lark 1.0
     * @platform Web,Native
     */
    var HttpRequest: {
        new (): HttpRequest;
    };
}
declare module lark.sys {
    /**
     * @private
     * 脏矩形计算工具类
     */
    class DirtyRegion {
        /**
         * @private
         */
        private dirtyList;
        /**
         * @private
         */
        private hasClipRect;
        /**
         * @private
         */
        private clipWidth;
        /**
         * @private
         */
        private clipHeight;
        /**
         * @private
         */
        private clipArea;
        /**
         * @private
         */
        private clipRectChanged;
        /**
         * @private
         * 设置剪裁边界，超过边界的节点将跳过绘制。
         */
        setClipRect(width: number, height: number): void;
        /**
         * @private
         * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
         */
        addRegion(target: Region): boolean;
        /**
         * @private
         */
        clear(): void;
        /**
         * @private
         * 获取最终的脏矩形列表
         */
        getDirtyRegions(): Region[];
        /**
         * @private
         * 合并脏矩形列表
         */
        private mergeDirtyList(dirtyList);
    }
}
declare module lark {
    /**
     * @private
     */
    var $locale_strings: any;
    /**
     * @private
     */
    var $language: string;
}
declare module lark.sys {
    /**
     * @private
     * 全局多语言翻译函数
     * @param code 要查询的字符串代码
     * @param args 替换字符串中{0}标志的参数列表
     * @returns 返回拼接后的字符串
     * @version Lark 1.0
     * @platform Web,Native
     */
    function tr(code: number, ...args: any[]): string;
}
declare module lark.sys {
    /**
     * @private
     */
    class Region {
        /**
         * @private
         * 释放一个Region实例到对象池
         */
        static release(region: Region): void;
        /**
         * @private
         * 从对象池中取出或创建一个新的Region对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        static create(): Region;
        /**
         * @private
         */
        minX: number;
        /**
         * @private
         */
        minY: number;
        /**
         * @private
         */
        maxX: number;
        /**
         * @private
         */
        maxY: number;
        /**
         * @private
         */
        width: number;
        /**
         * @private
         */
        height: number;
        /**
         * @private
         */
        area: number;
        /**
         * @private
         * 是否发生移动
         */
        moved: boolean;
        /**
         * @private
         */
        setTo(minX: number, minY: number, maxX: number, maxY: number): Region;
        /**
         * @private
         */
        updateArea(): void;
        /**
         * @private
         * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
         */
        union(target: Region): void;
        /**
         * @private
         * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
         */
        intersect(target: Region): void;
        /**
         * @private
         */
        private setEmpty();
        /**
         * @private
         * 确定此 Region 对象是否为空。
         */
        isEmpty(): boolean;
        /**
         * @private
         */
        intersects(target: Region): boolean;
        /**
         * @private
         */
        updateRegion(bounds: Rectangle, matrix: Matrix): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getDefinitionByName(name: string): any;
}
declare var __global: any;
declare module lark {
    /**
     * @language en_US
     * A class that provides constant values for visual blend mode effects. These constants are used in the blendMode
     * property of the DisplayObject class.
     * @see lark.DisplayObject#blendMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 提供混合模式可视效果的常量值的类,通常用于 DisplayObject 的 blendMode 属性上。
     * @see lark.DisplayObject#blendMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    class BlendMode {
        /**
         * @language en_US
         * The display object appears in front of the background. Pixel values of the display object override the pixel
         * values of the background. Where the display object is transparent, the background is visible.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该显示对象出现在背景前面。显示对象的像素值会覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static NORMAL: string;
        /**
         * @language en_US
         * Adds the values of the constituent colors of the display object to the colors of its background, applying a
         * ceiling of 0xFF. This setting is commonly used for animating a lightening dissolve between two objects.<br/>
         * For example, if the display object has a pixel with an RGB value of 0xAAA633, and the background pixel has an
         * RGB value of 0xDD2200, the resulting RGB value for the displayed pixel is 0xFFC833 (because 0xAA + 0xDD > 0xFF,
         * 0xA6 + 0x22 = 0xC8, and 0x33 + 0x00 = 0x33).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。<br/>
         * 例如，如果显示对象的某个像素的 RGB 值为 0xAAA633，背景像素的 RGB 值为 0xDD2200，则显示像素的结果 RGB 值为 0xFFC833
         * （因为 0xAA + 0xDD > 0xFF，0xA6 + 0x22 = 0xC8，且 0x33 + 0x00 = 0x33）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ADD: string;
        /**
         * @language en_US
         * Erases the background based on the alpha value of the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据显示对象的 Alpha 值擦除背景。Alpha 值不为0的区域将被擦除。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ERASE: string;
    }
}
declare module lark.sys {
    /**
     * @private
     * 转换 blendMode 字符串为数字。
     */
    function blendModeToNumber(blendMode: string): number;
    /**
     * @private
     * 转换数字为 blendMode 字符串。
     */
    function numberToBlendMode(blendMode: number): string;
}
declare module lark {
    /**
     * @language en_US
     * The Capabilities class provides properties that describe the system and runtime that are hosting the application.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/system/CapabilitiesExample.ts
     */
    /**
     * @language zh_CN
     * Capabilities 类提供一些属性，这些属性描述了承载应用程序的系统和运行时。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/system/CapabilitiesExample.ts
     */
    class Capabilities {
        /**
         * @language en_US
         * Specifies the language code of the system on which the content is running. The language is specified as a lowercase
         * two-letter language code from ISO 639-1. For Chinese, an additional uppercase two-letter country code from ISO 3166
         * distinguishes between Simplified and Traditional Chinese.<br/>
         * The following table lists the possible values,but not limited to them:
         * <ul>
         * <li>Simplified    Chinese  zh-CN</li>
         * <li>Traditional   Chinese  zh-TW</li>
         * <li>English       en</li>
         * <li>Japanese      ja</li>
         * <li>Korean        ko</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。<br/>
         * 以下是可能但不限于的语言和值：
         * <ul>
         * <li>简体中文  zh-CN</li>
         * <li>繁体中文  zh-TW</li>
         * <li>英语      en</li>
         * <li>日语      ja</li>
         * <li>韩语      ko</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        static language: string;
        /**
         * @language en_US
         * Specifies whether the system is running in a mobile device.(such as a mobile phone or tablet)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static isMobile: boolean;
        /**
         * @language en_US
         * Specifies the current operating system. The os property can return the following strings:
         * <ul>
         * <li>iPhone            "iOS"</li>
         * <li>Android Phone     "Android"</li>
         * <li>Windows Phone     "Windows Phone"</li>
         * <li>Windows Desktop   "Windows PC"</li>
         * <li>Mac Desktop       "Mac OS"</li>
         * <li>Unknown OS        "Unknown"</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示当前的操作系统。os 属性返回下列字符串：
         * <ul>
         * <li>苹果手机操作系统     "iOS"</li>
         * <li>安卓手机操作系统     "Android"</li>
         * <li>微软手机操作系统     "Windows Phone"</li>
         * <li>微软桌面操作系统     "Windows PC"</li>
         * <li>苹果桌面操作系统     "Mac OS"</li>
         * <li>未知操作系统        "Unknown"</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        static os: string;
        /**
         * @language en_US
         * Specifies whether the system supports the geolocation services
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持地理位置服务
         * @version Lark 1.0
         * @platform Web,Native
         */
        static hasGeolocation: boolean;
        /**
         * @language en_US
         * Specifies whether the system supports detecting the device orientation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持检测设备方向
         * @version Lark 1.0
         * @platform Web,Native
         */
        static hasOrientation: boolean;
        /**
         * @language en_US
         * Specifies whether the system supports the motion Sensor
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持运动传感器
         * @version Lark 1.0
         * @platform Web,Native
         */
        static hasMotion: boolean;
    }
}
declare module lark.sys {
    /**
     * @private
     * 心跳计时器单例
     */
    var $ticker: Ticker;
    /**
     * @private
     * 是否要广播Event.RENDER事件的标志。
     */
    var $invalidateRenderFlag: boolean;
    /**
     * @private
     * 需要立即刷新屏幕的标志
     */
    var $requestRenderingFlag: boolean;
    /**
     * @private
     * Lark心跳计时器
     */
    class Ticker {
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        private playerList;
        /**
         * @private
         */
        private callBackList;
        /**
         * @private
         */
        private thisObjectList;
        /**
         * @private
         */
        private getTickIndex(callBack, thisObject);
        /**
         * @private
         *
         */
        private concatTick();
        /**
         * @private
         */
        private frameInterval;
        /**
         * @private
         */
        private lastCount;
        /**
         * @private
         * 执行一次刷新
         */
        update(): void;
        /**
         * @private
         * 执行一次屏幕渲染
         */
        private render(triggerByFrame);
        /**
         * @private
         * 广播EnterFrame事件。
         */
        private broadcastEnterFrame();
        /**
         * @private
         * 广播Render事件。
         */
        private broadcastRender();
    }
}
declare module lark {
}
declare module lark {
    /**
     * @private
     * 哈希计数
     */
    var $hashCount: number;
    /**
     * @language en_US
     * The LarkObject class is the base class for all objects in the Lark framework.The LarkObject
     * class includes a hashCode property, which is a unique identification number of the instance.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Lark顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
     * @version Lark 1.0
     * @platform Web,Native
     */
    class LarkObject {
        /**
         * @language en_US
         * Initializes a LarkObject
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 LarkObject 对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * a unique identification number assigned to this instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        hashCode: number;
    }
}
declare module lark.sys {
    /**
     * @private
     * 屏幕适配器实例，开发者可以通过给这个变量赋值实现了IScreenAdapter接口的实例，从而注入自定义的屏幕适配器。
     */
    var screenAdapter: IScreenAdapter;
    /**
     * @private
     * 屏幕适配器默认实现，开发者可以实现自定义规则的屏幕适配器。并在初始化加载时将适配器的实例赋值给lark.sys.screenAdapter上，从而替换掉默认适配器。
     */
    class ScreenAdapter extends LarkObject implements IScreenAdapter {
        /**
         * @private
         */
        constructor();
        /**
         * @private
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
     * @private
     * 用户交互操作管理器
     */
    class TouchHandler extends LarkObject {
        /**
         * @private
         */
        constructor(stage: Stage);
        /**
         * @private
         */
        private stage;
        /**
         * @private
         */
        private touchDownTarget;
        /**
         * @private
         */
        private touchDownTime;
        /**
         * @private
         * 触摸开始（按下）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchBegin(x: number, y: number, touchPointID: number): void;
        /**
         * @private
         */
        private lastTouchX;
        /**
         * @private
         */
        private lastTouchY;
        /**
         * @private
         * 触摸移动
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchMove(x: number, y: number, touchPointID: number): void;
        /**
         * @private
         * 触摸结束（弹起）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        onTouchEnd(x: number, y: number, touchPointID: number): void;
        /**
         * @private
         * 获取舞台坐标下的触摸对象
         */
        private findTarget(stageX, stageY);
    }
}
declare module lark {
}
declare module lark {
    /**
     * @language en_US
     * The Graphics class contains a set of methods that you can use to create a vector shape. the Shape object that support
     * drawing includes a graphics property that is a Graphics object. The following are among those helper functions provided
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Graphics 类包含一组可用来创建矢量形状的方法。Shape是支持矢量绘制的显示对象。它含有一个 graphics 属性，该属性是一个 Graphics 对象。
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Graphics extends LarkObject {
        /**
         * @language en_US
         * creates a radial gradient given by the coordinates of the two circles represented by the parameters.
         * This method returns a radial GraphicsGradient.
         * @param x0 The x axis of the coordinate of the start circle.
         * @param y0 The y axis of the coordinate of the start circle.
         * @param r0 The radius of the start circle.
         * @param x1 The x axis of the coordinate of the end circle.
         * @param y1 The y axis of the coordinate of the end circle.
         * @param r1 The radius of the end circle.
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
         * @param x0 开始圆形的 x 轴坐标。
         * @param y0 开始圆形的 y 轴坐标。
         * @param r0 开始圆形的半径。
         * @param x1 结束圆形的 x 轴坐标。
         * @param y1 结束圆形的 y 轴坐标。
         * @param r1 结束圆形的半径。
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        static createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): GraphicsGradient;
        /**
         * @language en_US
         * reates a gradient along the line given by the coordinates represented by the parameters.This method returns a linear GraphicsGradient.
         * @see lark.GraphicsGradient
         * @param x0 The x axis of the coordinate of the start point.
         * @param y0 The y axis of the coordinate of the start point.
         * @param x1 The x axis of the coordinate of the end point.
         * @param y1 The y axis of the coordinate of the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
         * @param x0 起点的 x 轴坐标。
         * @param y0 起点的 y 轴坐标。
         * @param x1 终点的 x 轴坐标。
         * @param y1 终点的 y 轴坐标。
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        static createLinearGradient(x0: number, y0: number, x1: number, y1: number): GraphicsGradient;
        /**
         * @language en_US
         * creates a pattern using the specified image (BitmapData). It repeats the source in the directions specified by
         * the repetition argument. This method returns a GraphicsPattern.
         * @param bitmapData A BitmapData instance to be used as image to repeat.
         * @param repetition  indicating how to repeat the image. Possible values are:
         * "repeat" (both directions),
         * "repeat-x" (horizontal only),
         * "repeat-y" (vertical only), or
         * "no-repeat" (neither).
         * @see lark.GraphicsPattern
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         * @see lark.GraphicsPattern
         * @version Lark 1.0
         * @platform Web,Native
         */
        static createPattern(bitmapData: BitmapData, repetition: string): GraphicsPattern;
        /**
         * @private
         */
        constructor();
        /**
         * @private
         */
        private _fillStyle;
        /**
         * @language en_US
         * specifies the color or style to use inside shapes.
         * @default "#000000"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置要在图形内部填充的颜色或样式
         * @default "#000000"
         * @version Lark 1.0
         * @platform Web,Native
         */
        fillStyle: any;
        /**
         * @private
         */
        private _lineWidth;
        /**
         * @language en_US
         * sets the thickness of lines in pixels.
         * setting zero, negative, Infinity and NaN values are ignored
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        lineWidth: number;
        /**
         * @private
         */
        private _lineCap;
        /**
         * @language en_US
         * determines how the end points of every line are drawn. There are three possible values for this property and those are:<br/>
         * <ul>
         * <li>"butt": The ends of lines are squared off at the endpoints.</li>
         * <li>"round": The ends of lines are rounded.</li>
         * <li>"square": The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.</li>
         * </ul>
         * @default "butt"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"butt": 线段末端以方形结束。</li>
         * <li>"round": 线段末端以圆形结束。</li>
         * <li>"square": 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。</li>
         * </ul>
         * @default "butt"
         * @version Lark 1.0
         * @platform Web,Native
         */
        lineCap: string;
        /**
         * @private
         */
        private _strokeStyle;
        /**
         * @language en_US
         * specifies the color or style to use for the lines around shapes.
         * @default "#000000"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置要在图形边线填充的颜色或样式
         * @default "#000000"
         * @version Lark 1.0
         * @platform Web,Native
         */
        strokeStyle: any;
        /**
         * @private
         */
        private _lineJoin;
        /**
         * @language en_US
         * specifies the type of joint appearance used at angles.There are three possible values for this property and those are:<br/>
         * <ul>
         * <li>"round": Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint
         * of connected segments. The radius for these rounded corners is equal to the line width.</li>
         * <li>"bevel": Fills an additional triangular area between the common endpoint of connected segments, and the separate
         * outside rectangular corners of each segment.</li>
         * <li>"miter": Connected segments are joined by extending their outside edges to connect at a single point, with the
         * effect of filling an additional lozenge-shaped area. This setting is effected by the miterLimit property.</li>
         * </ul>
         * @default "miter"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定用于拐角的连接外观的类型,有3个可能的值，分别是：<br/>
         * <ul>
         * <li>"round": 圆角连接</li>
         * <li>"bevel": 斜角连接。</li>
         * <li>"miter": 尖角连接。当使用尖角模式时，还可以同时使用 miterLimit 参数限制尖角的长度。</li>
         * </ul>
         * @default "miter"
         * @version Lark 1.0
         * @platform Web,Native
         */
        lineJoin: string;
        /**
         * @private
         */
        private _miterLimit;
        /**
         * @language en_US
         * A number that indicates the limit at which a miter is cut off.
         * @default 10
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 用于表示剪切斜接的极限值的数字。
         * @default 10
         * @version Lark 1.0
         * @platform Web,Native
         */
        miterLimit: number;
        /**
         * @language en_US
         * adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending
         * at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
         * @param x The x coordinate of the arc's center.
         * @param y The y coordinate of the arc's center.
         * @param radius The arc's radius.
         * @param startAngle The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
         * @param endAngle The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
         * @param anticlockwise if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
         * @param x 圆弧中心（圆心）的 x 轴坐标。
         * @param y 圆弧中心（圆心）的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
         * @param endAngle 圆弧的重点， 单位以弧度表示。
         * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
         * @version Lark 1.0
         * @platform Web,Native
         */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
        /**
         * @private
         * 测量圆弧的矩形大小
         */
        private arcBounds(x, y, radius, startAngle, endAngle);
        /**
         * @language en_US
         * adds a quadratic Bézier curve to the path. It requires two points. The first point is a control point and the
         * second one is the end point. The starting point is the last point in the current path, which can be changed using
         * moveTo() before creating the quadratic Bézier curve.
         * @param cpx The x axis of the coordinate for the control point.
         * @param cpy The y axis of the coordinate for the control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
         * @param cpx 控制点的 x 轴坐标。
         * @param cpy 控制点的 y 轴坐标。
         * @param x 终点的 x 轴坐标。
         * @param y 终点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * @language en_US
         * adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and
         * the third one is the end point. The starting point is the last point in the current path, which can be changed
         * using moveTo() before creating the Bézier curve.
         * @param cp1x The x axis of the coordinate for the first control point.
         * @param cp1y The y axis of the coordinate for first control point.
         * @param cp2x The x axis of the coordinate for the second control point.
         * @param cp2y The y axis of the coordinate for the second control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
         * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
         * @param cp1x 第一个控制点的 x 轴坐标。
         * @param cp1y 第一个控制点的 y 轴坐标。
         * @param cp2x 第二个控制点的 x 轴坐标。
         * @param cp2y 第二个控制点的 y 轴坐标。
         * @param x 结束点的 x 轴坐标。
         * @param y 结束点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * @language en_US
         * connects the last point in the sub-path to the x, y coordinates with a straight line
         * @param x The x axis of the coordinate for the end of the line.
         * @param y The y axis of the coordinate for the end of the line.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用直线连接子路径的终点到x，y坐标。
         * @param x 直线终点的 x 轴坐标。
         * @param y 直线终点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        lineTo(x: number, y: number): void;
        /**
         * @language en_US
         * fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
         * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path. Possible values:
         * "nonzero": The non-zero winding rule, which is the default rule.
         * "evenodd": The even-odd winding rule.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
         * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
         * "nonzero": 非零环绕规则， 默认的规则。
         * "evenodd": 奇偶环绕规则。
         * @version Lark 1.0
         * @platform Web,Native
         */
        fill(fillRule?: string): void;
        /**
         * @language en_US
         * causes the point of the pen to move back to the start of the current sub-path. It tries to add a straight line
         * (but does not actually draw it) from the current point to the start. If the shape has already been closed or
         * has only one point, this function does nothing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
         * @version Lark 1.0
         * @platform Web,Native
         */
        closePath(): void;
        /**
         * @language en_US
         * creates a path for a rectangle at position (x, y) with a size that is determined by width and height. Those
         * four points are connected by straight lines and the sub-path is marked as closed, so that you can fill or stroke this rectangle.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        rect(x: number, y: number, width: number, height: number): void;
        /**
         * @language en_US
         * moves the starting point of a new sub-path to the (x, y) coordinates.
         * @param x The x axis of the point.
         * @param y The y axis of the point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将一个新的子路径的起始点移动到(x，y)坐标
         * @param x 点的 x 轴
         * @param y 点的 y 轴
         * @version Lark 1.0
         * @platform Web,Native
         */
        moveTo(x: number, y: number): void;
        /**
         * @language en_US
         * draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style is
         * determined by the fillStyle attribute.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
         * @param x 矩形起始点的 x 轴坐标。
         * @param y 矩形起始点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        fillRect(x: number, y: number, width: number, height: number): void;
        /**
         * @language en_US
         * strokes the current or given path with the current stroke style.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stroke(): void;
        /**
         * @language en_US
         * paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the surface,
         * using the current stroke style.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        strokeRect(x: number, y: number, width: number, height: number): void;
        /**
         * @language en_US
         * starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        beginPath(): void;
        /**
         * @language en_US
         * adds an arc to the path with the given control points and radius, connected to the previous point by a straight line.
         * @param x1 The x axis of the coordinate for the first control point.
         * @param y1 The y axis of the coordinate for the first control point.
         * @param x2 The x axis of the coordinate for the second control point.
         * @param y2 The y axis of the coordinate for the second control point.
         * @param radius The arc's radius.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
         * @param x1 第一个控制点的 x 轴坐标。
         * @param y1 第一个控制点的 y 轴坐标。
         * @param x2 第二个控制点的 x 轴坐标。
         * @param y2 第二个控制点的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @version Lark 1.0
         * @platform Web,Native
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * @language en_US
         * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         * @version Lark 1.0
         * @platform Web,Native
         */
        clear(): void;
        /**
         * @private
         */
        private isFirst;
        /**
         * @private
         */
        private minX;
        /**
         * @private
         */
        private minY;
        /**
         * @private
         */
        private maxX;
        /**
         * @private
         */
        private maxY;
        /**
         * @private
         */
        private hasMoved;
        /**
         * @private
         */
        private moveToX;
        /**
         * @private
         */
        private moveToY;
        /**
         * @private
         */
        private hasStroke;
        /**
         * @private
         */
        private hasFill;
        /**
         * @private
         *
         */
        private reset();
        /**
         * @private
         */
        private pushCommand(graphicsType, args);
        /**
         * @private
         */
        private checkMoveTo();
        /**
         * @private
         */
        private extendByPoint(x, y);
    }
}
declare module lark.sys {
    /**
     * @private
     */
    interface GraphicsCommand {
        /**
         * @private
         */
        type: number;
        /**
         * @private
         */
        arguments: any[];
    }
    /**
     * @private
     */
    const enum GraphicsCommandType {
        miterLimit = 0,
        lineCap = 1,
        lineJoin = 2,
        lineWidth = 3,
        strokeStyle = 4,
        fillStyle = 5,
        arc = 6,
        quadraticCurveTo = 7,
        lineTo = 8,
        fill = 9,
        closePath = 10,
        rect = 11,
        moveTo = 12,
        fillRect = 13,
        bezierCurveTo = 14,
        stroke = 15,
        strokeRect = 16,
        beginPath = 17,
        arcTo = 18,
    }
}
declare module lark {
    /**
     * @language en_US
     * The Event class is used as the base class for the creation of Event objects, which are passed as parameters to event
     * listeners when an event occurs.The properties of the Event class carry basic information about an event, such as
     * the event's type or whether the event's default behavior can be canceled. For many events, such as the events represented
     * by the Event class constants, this basic information is sufficient. Other events, however, may require more detailed
     * information. Events associated with a touch tap, for example, need to include additional information about the
     * location of the touch event. You can pass such additional information to event listeners by extending the Event class,
     * which is what the TouchEvent class does. Lark API defines several Event subclasses for common events that require
     * additional information. Events associated with each of the Event subclasses are described in the documentation for
     * each class.The methods of the Event class can be used in event listener functions to affect the behavior of the event
     * object. Some events have an associated default behavior. Your event listener can cancel this behavior by calling the
     * preventDefault() method. You can also make the current event listener the last one to process an event by calling
     * the stopPropagation() or stopImmediatePropagation() method.
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/EventExample.ts
     */
    /**
     * @language zh_CN
     * Event 类作为创建事件实例的基类，当发生事件时，Event 实例将作为参数传递给事件侦听器。Event 类的属性包含有关事件的基本信息，例如事件
     * 的类型或者是否可以取消事件的默认行为。对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
     * 例如，与触摸关联的事件需要包括有关触摸事件的位置信息。您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
     * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。Event 类的方法可以在
     * 事件侦听器函数中使用以影响事件对象的行为。某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
     * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/EventExample.ts
     */
    class Event extends LarkObject {
        /**
         * @language en_US
         * Emitted when a display object is added to the on stage display list, either directly or through the addition
         * of a sub tree in which the display object is contained.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ADDED_TO_STAGE: string;
        /**
         * @language en_US
         * Emitted when a display object is about to be removed from the display list, either directly or through the removal
         * of a sub tree in which the display object is contained.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static REMOVED_FROM_STAGE: string;
        /**
         * @language en_US
         * Emitted when a display object is added to the display list.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象添加到显示列表中时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ADDED: string;
        /**
         * @language en_US
         * Emitted when a display object is about to be removed from the display list.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将要从显示列表中删除显示对象时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static REMOVED: string;
        /**
         * @language en_US
         * [broadcast event] Emitted when the playhead is entering a new frame.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [广播事件] 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ENTER_FRAME: string;
        /**
         * @language en_US
         * Emitted when the display list is about to be updated and rendered.
         * Note: Every time you want to receive a render event,you must call the stage.invalidate() method.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 渲染事件，监听此事件将会在本帧末即将开始渲染的前一刻触发回调，这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * 注意：每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 stage.invalidate() 方法，由于每帧只会触发一次屏幕刷新，
         * 若在 Event.RENDER 回调函数执行期间再次调用stage.invalidate()，将会被忽略。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static RENDER: string;
        /**
         * @language en_US
         * Emitted when the size of stage or UIComponent is changed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台尺寸或UI组件尺寸发生改变
         * @version Lark 1.0
         * @platform Web,Native
         */
        static RESIZE: string;
        /**
         * @language en_US
         * Emitted when the value or selection of a property is chaned.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 属性值或状态发生改变。通常是按钮的选中状态，或者列表的选中项索引改变。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static CHANGE: string;
        /**
         * @language en_US
         * Emitted when the value or selection of a property is going to change.you can cancel this by calling the
         * preventDefault() method.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 属性值或状态即将发生改变,通常是按钮的选中状态，或者列表的选中项索引改变。可以通过调用 preventDefault() 方法阻止索引发生更改。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static CHANGING: string;
        /**
         * @language en_US
         * Emitted when the net request is complete.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 网络请求加载完成
         * @version Lark 1.0
         * @platform Web,Native
         */
        static COMPLETE: string;
        /**
         * @language en_US
         * Emitted when the net request is failed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 网络请求加载失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        static IO_ERROR: string;
        /**
         * @language en_US
         * Emitted when the TextInput instance gets focus.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput实例获得焦点
         * @version Lark 1.0
         * @platform Web,Native
         */
        static FOCUS_IN: string;
        /**
         * @language en_US
         * Emitted when the TextInput instance loses focus.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput实例失去焦点
         * @version Lark 1.0
         * @platform Web,Native
         */
        static FOCUS_OUT: string;
        /**
         * @language en_US
         * Emitted when the playback is ended.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 动画声音等播放完成
         * @version Lark 1.0
         * @platform Web,Native
         */
        static ENDED: string;
        /**
         * @language en_US
         * Creates an Event object to pass as a parameter to event listeners.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param data the optional data associated with this event
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param data 与此事件对象关联的可选数据。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
        /**
         * @language en_US
         * the optional data associated with this event
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 与此事件对象关联的可选数据。
         * @version Lark 1.0
         * @platform Web,Native
         */
        data: any;
        /**
         * @language en_US
         * The type of event. The type is case-sensitive.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  事件的类型。类型区分大小写。
         * @version Lark 1.0
         * @platform Web,Native
         */
        type: string;
        /**
         * @language en_US
         * Indicates whether an event is a bubbling event.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bubbles: boolean;
        /**
         * @language en_US
         * Indicates whether the behavior associated with the event can be prevented. If the behavior can be
         * canceled, this value is true; otherwise it is false.
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        cancelable: boolean;
        /**
         * @language en_US
         * The current phase in the event flow. This property can contain the following numeric values:
         * The capture phase (EventPhase.CAPTURING_PHASE).
         * The target phase (EventPhase.AT_TARGET)
         * The bubbling phase (EventPhase.BUBBLING_PHASE).
         * @see lark.EventPhase
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  事件流中的当前阶段。此属性可以包含以下数值：
         * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
         * 目标阶段 (EventPhase.AT_TARGET)。
         * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
         * @see lark.EventPhase
         * @version Lark 1.0
         * @platform Web,Native
         */
        eventPhase: number;
        /**
         * @language en_US
         * The object that is actively processing the Event object with an event listener. For example, if a
         * user clicks an OK button, the current target could be the node containing that button or one of its ancestors
         * that has registered an event listener for that event.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
         * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
         * @version Lark 1.0
         * @platform Web,Native
         */
        currentTarget: any;
        /**
         * @language en_US
         * The event target. This property contains the target node. For example, if a user clicks an OK button,
         * the target node is the display list node containing that button.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
         * @version Lark 1.0
         * @platform Web,Native
         */
        target: any;
        /**
         * @language en_US
         * Checks whether the preventDefault() method has been called on the event. If the preventDefault() method has been
         * called, returns true; otherwise, returns false.
         * @returns If preventDefault() has been called, returns true; otherwise, returns false.
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检查是否已对事件调用 preventDefault() 方法。
         * @returns 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        isDefaultPrevented(): boolean;
        /**
         * @language en_US
         * Cancels an event's default behavior if that behavior can be canceled.Many events have associated behaviors that
         * are carried out by default. For example, if a user types a character into a text input, the default behavior
         * is that the character is displayed in the text input. Because the TextEvent.TEXT_INPUT event's default behavior
         * can be canceled, you can use the preventDefault() method to prevent the character from appearing.
         * You can use the Event.cancelable property to check whether you can prevent the default behavior associated with
         * a particular event. If the value of Event.cancelable is true, then preventDefault() can be used to cancel the event;
         * otherwise, preventDefault() has no effect.
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 您可以使用 Event.cancelable 属性来检查是否可以防止与特定事件关联的默认行为。如果 Event.cancelable 的值为 true，
         * 则可以使用 preventDefault() 来取消事件；否则，preventDefault() 无效。
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Lark 1.0
         * @platform Web,Native
         */
        preventDefault(): void;
        /**
         * @language en_US
         * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow. This method
         * does not affect any event listeners in the current node (currentTarget). In contrast, the stopImmediatePropagation()
         * method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this
         * method have no effect. This method can be called in any phase of the event flow.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 currentTarget 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        stopPropagation(): void;
        /**
         * @language en_US
         * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
         * This method takes effect immediately, and it affects event listeners in the current node. In contrast, the
         * stopPropagation() method doesn't take effect until all the event listeners in the current node finish processing.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        stopImmediatePropagation(): void;
        /**
         * @language en_US
         * This method will be called automatically when you pass the event object as the parameters to the Event.release() method.
         * If your custom event is designed for reusable,you should override this method to make sure all the references to external
         * objects are cleaned. if not,it may cause memory leaking.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当事件实例传递给Event.release()静态方法时，实例上的clean()方法将会被自动调用。
         * 若此自定义事件的实例设计为可以循环复用的，为了避免引起内存泄露，自定义事件需要覆盖此方法来确保实例被缓存前断开对外部对象的一切引用。
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        protected clean(): void;
        /**
         * @language en_US
         * Gets one event instance from the object pool or create a new one. We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: If you want to use this method to initialize your custom event object,you must make sure the constructor
         * of your custom event is the same as the constructor of lark.Event.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;    //optional,initializes custom data here
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的事件实例。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：若使用此方法来创建自定义事件的实例，自定义的构造函数参数列表必须跟Event类一致。
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;  //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
         */
        static create<T extends Event>(EventClass: {
            new (type: string, bubbles?: boolean, cancelable?: boolean): T;
            eventPool?: Event[];
        }, type: string, bubbles?: boolean, cancelable?: boolean): T;
        /**
         * @language en_US
         * Releases an event object and cache it into the object pool.We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: The parameters of this method only accepts an instance created by the Event.create() method.
         * if not,it may throw an error.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data; //optional,initializes custom data here
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个事件对象，并缓存到对象池。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：此方法只能传入由Event.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
         */
        static release(event: Event): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The EventEmitter class is the base class for all classes that emit events. The EventEmitter class implements
     * the IEventEmitter interface and is the base class for the DisplayObject class. The EventEmitter class allows
     * any object on the display list to be an event target and as such, to use the methods of the IEventEmitter interface.
     * Event targets are an important part of the Lark event model. The event target serves as the focal point for how events
     * flow through the display list hierarchy. When an event such as a touch tap, Lark emits an event object into the
     * event flow from the root of the display list. The event object then makes its way through the display list until it
     * reaches the event target, at which point it begins its return trip through the display list. This round-trip journey
     * to the event target is conceptually divided into three phases: <br/>
     * the capture phase comprises the journey from the root to the last node before the event target's node, the target
     * phase comprises only the event target node, and the bubbling phase comprises any subsequent nodes encountered on
     * the return trip to the root of the display list. In general, the easiest way for a user-defined class to gain event
     * emitting capabilities is to extend EventEmitter. If this is impossible (that is, if the class is already extending
     * another class), you can instead implement the IEventEmitter interface, create an EventEmitter member, and write simple
     * hooks to route calls into the aggregated EventEmitter.
     * @see lark.IEventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/EventEmitterExample.ts
     */
    /**
     * @language zh_CN
     * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生触摸或按键等事件时，
     * 框架会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为三个阶段：
     * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括回程上遇到的任何后续节点到显示列表的根。
     * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），则可以实现
     * IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的映射，将调用连接到聚合的 EventEmitter 中。
     * @see lark.IEventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/EventEmitterExample.ts
     */
    class EventEmitter extends LarkObject implements IEventEmitter {
        /**
         * @language en_US
         * create an instance of the EventEmitter class.
         * @param target The target object for events emitted to the EventEmitter object. This parameter is used when
         * the EventEmitter instance is aggregated by a class that implements IEventEmitter it is necessary so that the
         * containing object can be the target for events. Do not use this parameter in simple cases in which a class extends EventEmitter.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 EventEmitter 类的实例
         * @param target 此 EventEmitter 所抛出事件对象的 target 指向。此参数主要用于一个实现了 IEventEmitter 接口的自定义类，
         * 以便抛出的事件对象的 target 属性可以指向自定义类自身。请勿在直接继承 EventEmitter 的情况下使用此参数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(target?: IEventEmitter);
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        once(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        hasListener(type: string): boolean;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        willTrigger(type: string): boolean;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        emit(event: Event): boolean;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        emitWith(type: string, bubbles?: boolean, cancelable?: boolean, data?: any): boolean;
    }
}
declare module lark.sys {
    /**
     * @private
     * 事件信息对象
     */
    interface EventBin {
        /**
         * @private
         */
        type: string;
        /**
         * @private
         */
        listener: (event: Event) => void;
        /**
         * @private
         */
        thisObject: any;
        /**
         * @private
         */
        priority: number;
        /**
         * @private
         */
        target: IEventEmitter;
        /**
         * @private
         */
        useCapture: boolean;
        /**
         * @private
         */
        emitOnce: boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal
     * axis and y represents the vertical axis.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/geom/PointExample.ts
     */
    /**
     * @language zh_CN
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/geom/PointExample.ts
     */
    class Point extends LarkObject {
        /**
         * @language en_US
         * Releases a point instance to the object pool
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Point实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        static release(point: Point): void;
        /**
         * @language en_US
         * get a point instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Point对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static create(x: number, y: number): Point;
        /**
         * @language en_US
         * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 lark.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(x?: number, y?: number);
        /**
         * @language en_US
         * The horizontal coordinate.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该点的水平坐标。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        x: number;
        /**
         * @language en_US
         * The vertical coordinate.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该点的垂直坐标。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        y: number;
        /**
         * @language en_US
         * The length of the line segment from (0,0) to this point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  从 (0,0) 到此点的线段长度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        length: number;
        /**
         * @language en_US
         * Sets the members of Point to the specified values
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         * @version Lark 1.0
         * @platform Web,Native
         */
        setTo(x: number, y: number): Point;
        /**
         * @language en_US
         * Creates a copy of this Point object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 克隆点对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        clone(): Point;
        /**
         * @language en_US
         * Determines whether two points are equal. Two points are equal if they have the same x and y values.
         * @param toCompare The point to be compared.
         * @returns A value of true if the object is equal to this Point object; false if it is not equal.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        equals(toCompare: Point): boolean;
        /**
         * @language en_US
         * Returns the distance between pt1 and pt2.
         * @param p1 The first point.
         * @param p2 The second point.
         * @returns The distance between the first and second points.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static distance(p1: Point, p2: Point): number;
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempPoint: Point;
}
declare module lark {
    /**
     * @language en_US
     * A Timer object emits a TimerEvent objects whenever the Timer object reaches the interval specified by the Timer.delay property.
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/TimerEventExample.ts
     */
    /**
     * @language zh_CN
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/TimerEventExample.ts
     */
    class TimerEvent extends Event {
        /**
         * @language en_US
         * Emitted whenever a Timer object reaches an interval specified according to the Timer.delay property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TIMER: string;
        /**
         * @language en_US
         * Emitted whenever it has completed the number of requests set by Timer.repeatCount.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TIMER_COMPLETE: string;
        /**
         * @language en_US
         * Creates an Event object with specific information relevant to timer events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Event 对象，其中包含有关 timer 事件的特定信息。
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * @language en_US
         * Instructs Lark runtime to render after processing of this event completes, if the display list has been modified.
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        updateAfterEvent(): void;
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        static emitTimerEvent(target: IEventEmitter, type: string, bubbles?: boolean, cancelable?: boolean): boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * MotionEvent represents the device's movement
     * Acceleration and accelerationIncludingGravity to represents the device's acceleration
     * RotationRate to represents the device's rotation
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * MotionEvent 类呈现设备运动的具体信息
     * Acceleration 和 accelerationIncludingGravity 呈现设备三个维度的加速度信息
     * RotationRate 呈现设备的旋转状态信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    class MotionEvent extends Event {
        /**
         * @language en_US
         * An object giving the acceleration of the device on the three axis X, Y and Z. Acceleration is expressed in m/s2.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * acceleration 表示设备在 X Y Z 轴方将的加速度信息，单位是  m/s2，不包含重力
         * @version Lark 1.0
         * @platform Web,Native
         */
        acceleration: DeviceAcceleration;
        /**
         * @language en_US
         * An object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. Acceleration is expressed in m/s2.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * acceleration 表示设备在 X Y Z 轴方将的加速度信息，单位是  m/s2，包含重力
         * @version Lark 1.0
         * @platform Web,Native
         */
        accelerationIncludingGravity: DeviceAcceleration;
        /**
         * @language en_US
         * An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is express in degrees per seconds.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * rotationRate 表示设备在 alpha、 beta 和 gamma 三个轴向的角速度信息，单位是 角度每秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        rotationRate: DeviceRotationRate;
    }
}
declare module lark {
    /**
     * @language en_US
     * The OrientationEvent provides information from the physical orientation of the device.
     * Note: Currently, Browsers on the iOS and Android does not handle the coordinates the same way.
     * Take care about this while using them.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * OrientationEvent 提供设备的方向信息
     * 注意: 目前各个浏览器和操作系统处理方向的方式不完全相同，请根据使用场景做相应的校正，
     * 比如使用两次方向数据的变化而不是直接使用方向的值
     * @version Lark 1.0
     * @platform Web,Native
     */
    class OrientationEvent extends Event {
        /**
         * @language en_US
         * A number representing the motion of the device around the z axis,
         * express in degrees with values ranging from 0 to 360
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360
         * @version Lark 1.0
         * @platform Web,Native
         */
        alpha: number;
        /**
         * @language en_US
         * A number representing the motion of the device around the x axis,
         * express in degrees with values ranging from -180 to 180.
         * This represents a front to back motion of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.
         * 这个值表示设备从前向后的旋转状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        beta: number;
        /**
         * @language en_US
         * A number representing the motion of the device around the y axis,
         * express in degrees with values ranging from -90 to 90.
         * This represents a left to right motion of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.
         * 这个值表示设备从前向后的旋转状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        gamma: number;
    }
}
declare module lark {
    /**
     * @language en_US
     * A ProgressEvent object is emitted when a load operation has begun. These events are usually generated when data are
     * loaded into an application.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 当加载操作已开始,将调度 ProgressEvent 事件。这些事件通常在数据加载到应用程序中时生成。
     * @version Lark 1.0
     * @platform Web,Native
     */
    class ProgressEvent extends Event {
        /**
         * @language en_US
         * Emitted when data is received as the download operation progresses.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在下载操作过程中收到数据时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static PROGRESS: string;
        /**
         * @language en_US
         * The number of items or bytes loaded when the listener processes the event.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在侦听器处理事件时加载的项数或字节数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bytesLoaded: number;
        /**
         * @language en_US
         * The total number of items or bytes that will be loaded if the loading process succeeds.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果加载过程成功，将加载的总项数或总字节数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bytesTotal: number;
        /**
         * @language en_US
         * Creates an Event object that contains information about progress events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information through the inherited cancelable property.
         * @param bytesLoaded The number of items or bytes loaded when the listener processes the event.
         * @param bytesTotal The total number of items or bytes that will be loaded if the loading process succeeds.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 ProgressEvent 对象
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, bytesLoaded?: number, bytesTotal?: number);
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type the type of event
         * @param bytesLoaded The number of items or bytes loaded when the listener processes the event.
         * @param bytesTotal The total number of items or bytes that will be loaded if the loading process succeeds.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的EventEmitter对象来抛出事件对象。使用此方法能够减少事件对象创建的数量，从而获得更高的代码运行性能。
         * @param target 派发事件目标
         * @param type 事件类型
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        static emitProgressEvent(target: IEventEmitter, type: string, bytesLoaded?: number, bytesTotal?: number): boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GeolocationEvent 提供设备的地理位置信息和获取位置时发生的错误信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    class GeolocationEvent extends Event {
        /**
         * @language en_US
         * The acquisition of the location information failed because of app don't have permission.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由于用户拒绝访问位置信息，获取位置信息失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        static PERMISSION_DENIED: string;
        /**
         * @language en_US
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备位置服务不可用或者超时等原因没有得到位置信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        static UNAVAILABLE: string;
        /**
         * @language en_US
         * The position's longitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的经度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        longitude: number;
        /**
         * @language en_US
         * The position's latitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的纬度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        latitude: number;
        /**
         * @language en_US
         * The velocity of the device in meters per second. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前设备的速度 单位是 米/秒，这个值可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        speed: number;
        /**
         * @language en_US
         * The direction in which the device is traveling. This value, specified in degrees,
         * indicates how far off from heading due north the device is. 0 degrees represents
         * true true north, and the direction is determined clockwise (which means that east
         * is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN. If the
         * device is unable to provide heading information, this value is null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
         * 比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。
         * @version Lark 1.0
         * @platform Web,Native
         */
        heading: number;
        /**
         * @language en_US
         * The position's altitude in metres, relative to sea level.
         * This value can be null if the implementation cannot provide the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置的海拔信息，如果设备没有实现这个属性时，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitude: number;
        /**
         * @language en_US
         * The accuracy of the latitude and longitude properties, expressed in meters.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 经纬度的准确性，单位是米
         * @version Lark 1.0
         * @platform Web,Native
         */
        accuracy: number;
        /**
         * @language en_US
         * The accuracy of the altitude expressed in meters. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置海拔信息的准确性，单位是米，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitudeAccuracy: number;
        /**
         * @language en_US
         * The type of error occurred while get the location of the device. The value could be:
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误时的错误类型。值可能为：
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorType: string;
        /**
         * @language en_US
         * The error message occurred while get the location of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误的错误信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorMessage: string;
    }
}
declare module lark {
    /**
     * @language en_US
     * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its
     * width and its height.<br/>
     * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of
     * one property has no effect on the others. However, the right and bottom properties are integrally related to those
     * four properties. For example, if you change the value of the right property, the value of the width property changes;
     * if you change the bottom property, the value of the height property changes.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/geom/RectangleExample.ts
     */
    /**
     * @language zh_CN
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/geom/RectangleExample.ts
     */
    class Rectangle extends LarkObject {
        /**
         * @language en_US
         * Releases a rectangle instance to the object pool.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Rectangle实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        static release(rect: Rectangle): void;
        /**
         * @language en_US
         * get a rectangle instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Rectangle对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static create(): Rectangle;
        /**
         * @language en_US
         * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified
         * width and height parameters.
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
         * @language en_US
         * The x coordinate of the top-left corner of the rectangle.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形左上角的 x 坐标。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        x: number;
        /**
         * @language en_US
         * The y coordinate of the top-left corner of the rectangle.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形左上角的 y 坐标。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        y: number;
        /**
         * @language en_US
         * The width of the rectangle, in pixels.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形的宽度（以像素为单位）。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        width: number;
        /**
         * @language en_US
         * 矩形的高度（以像素为单位）。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * The height of the rectangle, in pixels.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        height: number;
        /**
         * @language en_US
         * The sum of the x and width properties.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 和 width 属性的和。
         * @version Lark 1.0
         * @platform Web,Native
         */
        right: number;
        /**
         * @language en_US
         * The sum of the y and height properties.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * y 和 height 属性的和。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bottom: number;
        /**
         * @language en_US
         * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has
         * no effect on the y and height properties. However it does affect the width property, whereas changing the x value
         * does not affect the width property.
         * The value of the left property is equal to the value of the x property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
         * left 属性的值等于 x 属性的值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        left: number;
        /**
         * @language en_US
         * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has
         * no effect on the x and width properties. However it does affect the height property, whereas changing the y
         * value does not affect the height property.<br/>
         * The value of the top property is equal to the value of the y property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
         * top 属性的值等于 y 属性的值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        top: number;
        /**
         * @language en_US
         * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
         * @param sourceRect The Rectangle object from which to copy the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         * @param sourceRect 要从中复制数据的 Rectangle 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        copyFrom(sourceRect: Rectangle): Rectangle;
        /**
         * @language en_US
         * Sets the members of Rectangle to the specified values
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        setTo(x: number, y: number, width: number, height: number): Rectangle;
        /**
         * @language en_US
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * @param x The x coordinate (horizontal position) of the point.
         * @param y The y coordinate (vertical position) of the point.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         * @version Lark 1.0
         * @platform Web,Native
         */
        contains(x: number, y: number): boolean;
        /**
         * @language en_US
         * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns
         * the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty
         * Rectangle object with its properties set to 0.
         * @param toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
         * @returns A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method
         * returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
         * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
         * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
         * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
         * height 属性均设置为 0 的矩形。
         * @version Lark 1.0
         * @platform Web,Native
         */
        intersection(toIntersect: Rectangle): Rectangle;
        /**
         * @language en_US
         * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
         * This method checks the x, y, width, and height properties of the specified Rectangle object to see if it
         * intersects with this Rectangle object.
         * @param toIntersect The Rectangle object to compare against this Rectangle object.
         * @returns A value of true if the specified object intersects with this Rectangle object; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         * @version Lark 1.0
         * @platform Web,Native
         */
        intersects(toIntersect: Rectangle): boolean;
        /**
         * @language en_US
         * Determines whether or not this Rectangle object is empty.
         * @returns A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定此 Rectangle 对象是否为空。
         * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        isEmpty(): boolean;
        /**
         * @language en_US
         * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Rectangle 对象的所有属性设置为 0。
         * @version Lark 1.0
         * @platform Web,Native
         */
        setEmpty(): void;
        /**
         * @language en_US
         * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @returns A new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @version Lark 1.0
         * @platform Web,Native
         */
        clone(): Rectangle;
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempRectangle: Rectangle;
}
declare module lark {
    /**
     * @language en_US
     * The Timer class is the interface to timers, which let you run code on a specified time sequence. Use the start()
     * method to start a timer. Add an event listener for the timer event to set up code to be run on the timer interval.<br/>
     * You can create Timer objects to run once or repeat at specified intervals to execute code on a schedule. Depending
     * on the framerate or the runtime environment (available memory and other factors), the runtime may emit events at
     * slightly offset intervals.
     * @see lark.TimerEvent
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/utils/TimerExample.ts
     */
    /**
     * @language zh_CN
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。
     * 使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。
     * 可以创建 Timer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。
     * 根据 Lark 的帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。
     * @see lark.TimerEvent
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/utils/TimerExample.ts
     */
    class Timer extends EventEmitter {
        /**
         * @language en_US
         * Constructs a new Timer object with the specified delay and repeatCount states.
         * @param delay The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.
         * Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
         * @param repeatCount Specifies the number of repetitions. If zero, the timer repeats indefinitely.If nonzero,
         * the timer runs the specified number of times and then stops.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的 delay 和 repeatCount 状态构造新的 Timer 对象。
         * @param delay 计时器事件间的延迟（以毫秒为单位）。建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
         * @param repeatCount 指定重复次数。如果为零，则计时器将持续不断重复运行。如果不为 0，则将运行计时器，运行次数为指定的次数，然后停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(delay: number, repeatCount?: number);
        /**
         * @private
         */
        private _delay;
        /**
         * @language en_US
         * The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.<br/>
         * Note: Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。<br/>
         * 注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
         * @version Lark 1.0
         * @platform Web,Native
         */
        delay: number;
        /**
         * @language en_US
         * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely,
         * until the stop() method is invoked or the program stops. If the repeat count is nonzero, the timer runs the specified
         * number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置的计时器运行总次数。如果重复计数设置为 0，则计时器将持续不断运行，或直至调用了 stop() 方法或节目停止。
         * 如果重复计数不为 0，则将运行计时器，运行次数为指定的次数。如果设置的 repeatCount 总数等于或小于 currentCount，则计时器将停止并且不会再次触发。
         * @version Lark 1.0
         * @platform Web,Native
         */
        repeatCount: number;
        /**
         * @private
         */
        private _currentCount;
        /**
         * @language en_US
         * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        currentCount: number;
        /**
         * @private
         */
        private _running;
        /**
         * @language en_US
         * The timer's current state; true if the timer is running, otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        running: boolean;
        /**
         * @language en_US
         * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
         * Then, when start() is called, the timer instance runs for the specified number of repetitions, as set by the repeatCount value.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        reset(): void;
        /**
         * @language en_US
         * Starts the timer, if it is not already running.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果计时器尚未运行，则启动计时器。
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stops the timer. When start() is called after stop(), the timer instance runs for the remaining number of
         * repetitions, as set by the repeatCount property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
        /**
         * @private
         */
        private updateInterval;
        /**
         * @private
         */
        private lastCount;
    }
}
declare module lark {
    /**
     * @language en_US
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Matrix extends LarkObject {
        /**
         * @language en_US
         * Releases a matrix instance to the object pool
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Matrix实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        static release(matrix: Matrix): void;
        /**
         * @language en_US
         * get a matrix instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Matrix对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static create(): Matrix;
        /**
         * @language en_US
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        a: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        b: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        c: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        d: number;
        /**
         * @language en_US
         * The distance by which to translate each point along the x axis.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 x 轴平移每个点的距离
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        tx: number;
        /**
         * @language en_US
         * The distance by which to translate each point along the y axis.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 y 轴平移每个点的距离
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        ty: number;
        /**
         * @language en_US
         * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         * @version Lark 1.0
         * @platform Web,Native
         */
        clone(): Matrix;
        /**
         * @language en_US
         * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical
         * terms, concatenating two matrixes is the same as combining them using matrix multiplication.
         * @param other The matrix to be concatenated to the source matrix.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。在数学术语中，将两个矩阵连接起来与使用矩阵乘法将它们结合起来是相同的。
         * @param other 要连接到源矩阵的矩阵。
         * @version Lark 1.0
         * @platform Web,Native
         */
        concat(other: Matrix): void;
        /**
         * @language en_US
         * Copies all of the matrix data from the source Point object into the calling Matrix object.
         * @param other  The Matrix object from which to copy the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         * @param other 要拷贝的目标矩阵
         * @version Lark 1.0
         * @platform Web,Native
         */
        copyFrom(other: Matrix): Matrix;
        /**
         * @language en_US
         * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an
         * identity matrix will be identical to the original. After calling the identity() method, the resulting matrix
         * has the following properties: a=1, b=0, c=0, d=1, tx=0, ty=0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @version Lark 1.0
         * @platform Web,Native
         */
        identity(): void;
        /**
         * @language en_US
         * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to
         * undo the transformation performed when applying the original matrix.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @version Lark 1.0
         * @platform Web,Native
         */
        invert(): void;
        /**
         * @language en_US
         * Applies a rotation transformation to the Matrix object.
         * The rotate() method alters the a, b, c, and d properties of the Matrix object.
         * @param angle The rotation angle in radians.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        rotate(angle: number): void;
        /**
         * @language en_US
         * Applies a scaling transformation to the matrix. The x axis is multiplied by sx, and the y axis it is multiplied by sy.
         * The scale() method alters the a and d properties of the Matrix object.
         * @param sx A multiplier used to scale the object along the x axis.
         * @param sy A multiplier used to scale the object along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        scale(sx: number, sy: number): void;
        /**
         * @language en_US
         * Sets the members of Matrix to the specified values
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Lark 1.0
         * @platform Web,Native
         */
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        /**
         * @language en_US
         * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
         * @param pointX The x coordinate for which you want to get the result of the Matrix transformation.
         * @param pointY The y coordinate for which you want to get the result of the Matrix transformation.
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns The point resulting from applying the Matrix transformation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         * @version Lark 1.0
         * @platform Web,Native
         */
        transformPoint(pointX: number, pointY: number, resultPoint?: Point): Point;
        /**
         * @language en_US
         * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
         * @param dx The amount of movement along the x axis to the right, in pixels.
         * @param dy The amount of movement down along the y axis, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        translate(dx: number, dy: number): void;
        /**
         * @language en_US
         * Determines whether two matrixes are equal.
         * @param other The matrix to be compared.
         * @returns A value of true if the object is equal to this Matrix object; false if it is not equal.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         * @version Lark 1.0
         * @platform Web,Native
         */
        equals(other: Matrix): boolean;
        /**
         * @private
         */
        private getDeterminant();
    }
    /**
     * @private
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    var $TempMatrix: Matrix;
}
declare module lark.sys {
    /**
     * @private
     * 显示对象失效标志
     */
    const enum DisplayObjectFlags {
        /**
         * @private
         * 显示对象自身的绘制区域尺寸失效
         */
        InvalidContentBounds = 2,
        /**
         * @private
         * 显示对象的矩形区域尺寸失效，包括自身绘制区域和子项的区域集合
         */
        InvalidBounds = 4,
        /**
         * @private
         * 显示对象的matrix属性失效标志，通常因为scaleX，width等属性发生改变。
         */
        InvalidMatrix = 8,
        /**
         * @private
         * 显示对象祖代的矩阵失效。
         */
        InvalidConcatenatedMatrix = 16,
        /**
         * @private
         * 显示对象祖代的逆矩阵失效。
         */
        InvalidInvertedConcatenatedMatrix = 32,
        /**
         * @private
         * 显示对象祖代的透明度属性失效。
         */
        InvalidConcatenatedAlpha = 64,
        /**
         * @private
         * 显示对象自身需要重绘的标志
         */
        DirtyRender = 256,
        /**
         * @private
         * 子项中已经全部含有DirtyRender标志，无需继续遍历。
         */
        DirtyChildren = 512,
        /**
         * @private
         * DirtyRender|DirtyChildren
         */
        Dirty = 768,
        /**
         * @private
         * 添加或删除子项时，需要向子项传递的标志。
         */
        DownOnAddedOrRemoved = 624,
        /**
         * @private
         * 显示对象初始化时的标志量
         */
        InitFlags = 880,
    }
}
declare module lark {
    /**
     * @language en_US
     * The DisplayObject class is the base class for all objects that can be placed on the display list. The display list
     * manages all objects displayed in the runtime. Use the DisplayObjectContainer class to arrange the display
     * objects in the display list. DisplayObjectContainer objects can have child display objects, while other display objects,
     * such as Shape and TextField objects, are "leaf" nodes that have only parents and siblings, no children.
     * The DisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced
     * properties of the object such as its transformation matrix.<br/>
     * The DisplayObject class contains several broadcast events.Normally, the target of any particular event is a specific
     * DisplayObject instance. For example, the target of an added event is the specific DisplayObject instance that was added
     * to the display list. Having a single target restricts the placement of event listeners to that target and in some cases
     * the target's ancestors on the display list. With broadcast events, however, the target is not a specific DisplayObject
     * instance, but rather all DisplayObject instances, including those that are not on the display list. This means that you
     * can add a listener to any DisplayObject instance to listen for broadcast events.
     *
     * @event lark.Event.ADDED Emitted when a display object is added to the display list.
     * @event lark.Event.ADDED_TO_STAGE Emitted when a display object is added to the on stage display list, either directly or through the addition of a sub tree in which the display object is contained.
     * @event lark.Event.REMOVED Emitted when a display object is about to be removed from the display list.
     * @event lark.Event.REMOVED_FROM_STAGE Emitted when a display object is about to be removed from the display list, either directly or through the removal of a sub tree in which the display object is contained.
     * @event lark.Event.ENTER_FRAME [broadcast event] Emitted when the playhead is entering a new frame.
     * @event lark.Event.RENDER [broadcast event] Emitted when the display list is about to be updated and rendered.
     * @event lark.TouchEvent.TOUCH_MOVE Emitted when the user touches the device, and is continuously dispatched until the point of contact is removed.
     * @event lark.TouchEvent.TOUCH_BEGIN Emitted when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_END Emitted when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_TAP Emitted when the user lifts the point of contact over the same DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_RELEASE_OUTSIDE Emitted when the user lifts the point of contact over the different DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列
     * 显示列表中的显示对象。DisplayObjectContainer 对象可以有子显示对象，而其他显示对象（如 Shape 和 TextField 对象）是“叶”节点，没有子项，只有父级和
     * 同级。DisplayObject 类有一些基本的属性（如确定坐标位置的 x 和 y 属性），也有一些高级的对象属性（如 Matrix 矩阵变换）。<br/>
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。例如，added 事件的目标是已添加到显示列表
     * 的目标 DisplayObject 实例。若只有一个目标，则会将事件侦听器限制为只能监听在该目标上（在某些情况下，可监听在显示列表中该目标的祖代上）。
     * 但是对于广播事件，目标不是特定的 DisplayObject 实例，而是所有 DisplayObject 实例（包括那些不在显示列表中的实例）。这意味着您可以向任何
     * DisplayObject 实例添加侦听器来侦听广播事件。
     *
     * @event lark.Event.ADDED 将显示对象添加到显示列表中时调度。
     * @event lark.Event.ADDED_TO_STAGE 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
     * @event lark.Event.REMOVED 将要从显示列表中删除显示对象时调度。
     * @event lark.Event.REMOVED_FROM_STAGE 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
     * @event lark.Event.ENTER_FRAME [广播事件] 播放头进入新帧时调度。
     * @event lark.Event.RENDER [广播事件] 将要更新和呈现显示列表时调度。
     * @event lark.TouchEvent.TOUCH_MOVE 当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
     * @event lark.TouchEvent.TOUCH_BEGIN 当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）调度。
     * @event lark.TouchEvent.TOUCH_END 当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）调度。
     * @event lark.TouchEvent.TOUCH_TAP 当用户在启用触摸设备上的已启动接触的同一 DisplayObject 实例上抬起接触点时（例如，在配有触摸屏的移动电话或平板电脑的显示对象上的某一点处按下并释放手指）调度。
     * @event lark.TouchEvent.TOUCH_RELEASE_OUTSIDE 当用户在启用触摸设备上的已启动接触的不同 DisplayObject 实例上抬起接触点时（例如，在配有触摸屏的移动电话或平板电脑的显示对象上的某一点处按下并释放手指）调度。
     * @version Lark 1.0
     * @platform Web,Native
     */
    class DisplayObject extends EventEmitter implements sys.Renderable {
        /**
         * @language en_US
         * Initializes a DisplayObject object
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个显示对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @private
         * 标记矩阵失效
         */
        private invalidateMatrix();
        /**
         * @private
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        private invalidatePosition();
        /**
         * @language en_US
         * Indicates the instance name of the DisplayObject. The object can be identified in the child list of its parent
         * display object container by calling the getChildByName() method of the display object container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 DisplayObject 的实例名称。
         * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        name: string;
        /**
         * @language en_US
         * Indicates the DisplayObjectContainer object that contains this display object. Use the parent property to specify
         * a relative path to display objects that are above the current display object in the display list hierarchy.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示包含此显示对象的 DisplayObjectContainer 对象。
         * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
         * @version Lark 1.0
         * @platform Web,Native
         */
        parent: DisplayObjectContainer;
        /**
         * @language en_US
         * The Stage of the display object. you can create and load multiple display objects into the display list, and
         * the stage property of each display object refers to the same Stage object.<br/>
         * If a display object is not added to the display list, its stage property is set to null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 显示对象的舞台。
         * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。<br/>
         * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stage: Stage;
        /**
         * @language en_US
         * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.<br/>
         * Note: to change the value of a display object's matrix, you must make a copy of the entire matrix object, then copy
         * the new object into the matrix property of the display object.
         * @example the following code increases the tx value of a display object's matrix
         * <pre>
         *     var myMatrix:Matrix = myDisplayObject.matrix;
         *     myMatrix.tx += 10;
         *     myDisplayObject.matrix = myMatrix;
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。<br/>
         * 注意：要改变一个显示对象矩阵的值，您必引用整个矩阵对象，然后将它重新赋值给显示对象的 matrix 属性。
         * @example 以下代码改变了显示对象矩阵的tx属性值：
         * <pre>
         *     var myMatrix:Matrix = myDisplayObject.matrix;
         *     myMatrix.tx += 10;
         *     myDisplayObject.matrix = myMatrix;
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        matrix: Matrix;
        /**
         * @language en_US
         * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
         * DisplayObjectContainer.<br/>
         * If the object is inside a DisplayObjectContainer that has transformations, it is in
         * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer
         * rotated 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is
         * rotated 90° counterclockwise. The object's coordinates refer to the registration point position.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。<br/>
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        x: number;
        /**
         * @language en_US
         * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
         * DisplayObjectContainer. <br/>
         * If the object is inside a DisplayObjectContainer that has transformations, it is in
         * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated
         * 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90°
         * counterclockwise. The object's coordinates refer to the registration point position.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。<br/>
         * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
         * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        y: number;
        /**
         * @language en_US
         * Indicates the horizontal scale (percentage) of the object as applied from the registration point. <br/>
         * The default 1.0 equals 100% scale.Scaling the local coordinate system changes the x and y property values, which are
         * defined in whole pixels.
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示从注册点开始应用的对象的水平缩放比例（百分比）。<br/>
         * 1.0 等于 100% 缩放。缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        scaleX: number;
        /**
         * @language en_US
         * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
         * 1.0 is 100% scale.Scaling the local coordinate system changes the x and y property values, which are defined
         * in whole pixels.
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。1.0 是 100% 缩放。
         * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        scaleY: number;
        /**
         * @language en_US
         * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation. Values from
         * 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation. Values outside
         * this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement
         * myDisplayObject.rotation = 450 is the same as myDisplayObject.rotation = 90.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
         * 减去 360 获得该范围内的值。例如，myDisplayObject.rotation = 450语句与 myDisplayObject.rotation = 90 是相同的。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        rotation: number;
        /**
         * @language en_US
         * Indicates the width of the display object, in pixels. The width is calculated based on the bounds of the content
         * of the display object. When you set the width property, the scaleX property is adjusted accordingly.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。如果您设置了 width 属性，则 scaleX 属性会相应调整.
         * @version Lark 1.0
         * @platform Web,Native
         */
        width: number;
        /**
         * @language en_US
         * Indicates the height of the display object, in pixels. The height is calculated based on the bounds of the
         * content of the display object. When you set the height property, the scaleY property is adjusted accordingly.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。如果您设置了 height 属性，则 scaleY 属性会相应调整。
         * @version Lark 1.0
         * @platform Web,Native
         */
        height: number;
        /**
         * @language en_US
         * Whether or not the display object is visible. Display objects that are not visible are disabled. For example,
         * if visible=false for an DisplayObject instance, it cannot receive touch or other user input.
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 显示对象是否可见。不可见的显示对象将被禁用。例如，如果实例的 visible 为 false，则无法接受触摸或用户交互操作。
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        visible: boolean;
        /**
         * @language en_US
         * If set to true, Lark runtime caches an internal bitmap representation of the display object. This caching can
         * increase performance for display objects that contain complex vector content. After you set the cacheAsBitmap
         * property to true, the rendering does not change, however the display object performs pixel snapping automatically.
         * The execution speed can be significantly faster depending on the complexity of the content.The cacheAsBitmap
         * property is best used with display objects that have mostly static content and that do not scale and rotate frequently.<br/>
         * Note: The display object will not create the bitmap caching when the memory exceeds the upper limit,even if you set it to true.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果设置为 true，则 Lark 运行时将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
         * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
         * 具体取决于显示对象内容的复杂性。最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放或旋转的显示对象一起使用。<br/>
         * 注意：在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        cacheAsBitmap: boolean;
        /**
         * @language en_US
         * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent) to 1 (fully opaque).
         * The default value is 1. Display objects with alpha set to 0 are active, even though they are invisible.
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示指定对象的 Alpha 透明度值。
         * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是可触摸的，即使它们不可见。
         * @default 1
         * @version Lark 1.0
         * @platform Web,Native
         */
        alpha: number;
        /**
         * @language en_US
         * Specifies whether this object receives touch or other user input. The default value is true, which means that
         * by default any DisplayObject instance that is on the display list receives touch events. If touchEnabled is
         * set to false, the instance does not receive any touch events (or other user input events). Any children of
         * this instance on the display list are not affected. To change the touchEnabled behavior for all children of
         * an object on the display list, use DisplayObjectContainer.touchChildren.
         * @see lark.DisplayObjectContainer#touchChildren
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定此对象是否接收触摸或其他用户输入。默认值为 true，这表示默认情况下，显示列表上的任何 isplayObject 实例都会接收触摸事件或
         * 其他用户输入事件。如果将 touchEnabled 设置为 false，则实例将不接收任何触摸事件（或其他用户输入事件）。显示列表上的该实例的任
         * 何子级都不会受到影响。要更改显示列表上对象的所有子级的 touchEnabled 行为，请使用 DisplayObjectContainer.touchChildren。
         * @see lark.DisplayObjectContainer#touchChildren
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        touchEnabled: boolean;
        /**
         * @language en_US
         * The scroll rectangle bounds of the display object. The display object is cropped to the size defined by the rectangle,
         * and it scrolls within the rectangle when you change the x and y properties of the scrollRect object. A scrolled display
         * object always scrolls in whole pixel increments.You can scroll an object left and right by setting the x property of
         * the scrollRect Rectangle object. You can scroll an object up and down by setting the y property of the scrollRect
         * Rectangle object. If the display object is rotated 90° and you scroll it left and right, the display object actually
         * scrolls up and down.<br/>
         *
         * Note: to change the value of a display object's scrollRect, you must make a copy of the entire scrollRect object, then copy
         * the new object into the scrollRect property of the display object.
         * @example the following code increases the x value of a display object's scrollRect
         * <pre>
         *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
         *     myRectangle.x += 10;
         *     myDisplayObject.scrollRect = myRectangle;
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
         * 滚动的显示对象始终以整像素为增量进行滚动。您可以通过设置 scrollRect Rectangle 对象的 x 属性来左右滚动对象， 还可以通过设置
         * scrollRect 对象的 y 属性来上下滚动对象。如果显示对象旋转了 90 度，并且您左右滚动它，则实际上显示对象会上下滚动。<br/>
         *
         * 注意：要改变一个显示对象 scrollRect 属性的值，您必引用整个 scrollRect 对象，然后将它重新赋值给显示对象的 scrollRect 属性。
         * @example 以下代码改变了显示对象 scrollRect 的 x 属性值：
         * <pre>
         *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
         *     myRectangle.x += 10;
         *     myDisplayObject.scrollRect = myRectangle;
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        scrollRect: Rectangle;
        /**
         * @language en_US
         * A value from the BlendMode class that specifies which blend mode to use. Determine how a source image (new one)
         * is drawn on the target image (old one).<br/>
         * If you attempt to set this property to an invalid value, Lark runtime set the value to BlendMode.NORMAL.
         * @default lark.BlendMode.NORMAL
         * @see lark.BlendMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上<br/>
         * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
         * @default lark.BlendMode.NORMAL
         * @see lark.BlendMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        blendMode: string;
        /**
         * @language en_US
         * The calling display object is masked by the specified mask object. To ensure that masking works when the Stage
         * is scaled, the mask display object must be in an active part of the display list. The mask object itself is not drawn.
         * Set mask to null to remove the mask. To be able to scale a mask object, it must be on the display list. To be
         * able to drag a mask Sprite object , it must be on the display list.<br/>
         * Note: A single mask object cannot be used to mask more than one calling display object. When the mask is assigned
         * to a second display object, it is removed as the mask of the first object, and that object's mask property becomes null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
         * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
         * Sprite 对象，它必须在显示列表中。<br/>
         * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
         * 该对象的 mask 属性将变为 null。
         * @version Lark 1.0
         * @platform Web,Native
         */
        mask: DisplayObject;
        /**
         * @language en_US
         * Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
         * @param targetCoordinateSpace The display object that defines the coordinate system to use.
         * @param resultRect A reusable instance of Rectangle for saving the results. Passing this parameter can reduce the number of reallocate objects
         *, which allows you to get better code execution performance..
         * @returns The rectangle that defines the area of the display object relative to the targetCoordinateSpace object's coordinate system.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 一个用于存储结果的可复用Rectangle实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         * @version Lark 1.0
         * @platform Web,Native
         */
        getBounds(targetCoordinateSpace: DisplayObject, resultRect?: Rectangle): Rectangle;
        /**
         * @language en_US
         * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates.
         * @param stageX the x value in the global coordinates
         * @param stageY the y value in the global coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns A Point object with coordinates relative to the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        globalToLocal(stageX: number, stageY: number, resultPoint?: Point): Point;
        /**
         * @language en_US
         * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates.
         * @param localX the x value in the local coordinates
         * @param localY the x value in the local coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns  A Point object with coordinates relative to the Stage.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象的（本地）坐标转换为舞台（全局）坐标。
         * @param localX 本地坐标 x
         * @param localY 本地坐标 y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 一个具有相对于舞台坐标的 Point 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        localToGlobal(localX: number, localY: number, resultPoint?: Point): Point;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeListener(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        emit(event: Event): boolean;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        willTrigger(type: string): boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * The TouchEvent class lets you handle events on devices that detect user contact with the device (such as a finger
     * on a touch screen).When a user interacts with a device such as a mobile phone or tablet with a touch screen, the
     * user typically touches the screen with his or her fingers or a pointing device. You can develop applications that
     * respond to basic touch events (such as a single finger tap) with the TouchEvent class. Create event listeners using
     * the event types defined in this class.
     * Note: When objects are nested on the display list, touch events target the deepest possible nested object that is
     * visible in the display list. This object is called the target node. To have a target node's ancestor (an object
     * containing the target node in the display list) receive notification of a touch event, use EventEmitter.on()
     * on the ancestor node with the type parameter set to the specific touch event you want to detect.
     *
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/TouchEventExample.ts
     */
    /**
     * @language zh_CN
     * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
     * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
     * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
     * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
     * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
     * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
     *
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/events/TouchEventExample.ts
     */
    class TouchEvent extends Event {
        /**
         * @language en_US
         * Emitted when the user touches the device, and is continuously emitted until the point of contact is removed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOUCH_MOVE: string;
        /**
         * @language en_US
         * Emitted when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOUCH_BEGIN: string;
        /**
         * @language en_US
         * Emitted when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone
         * or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOUCH_END: string;
        /**
         * @language en_US
         * Emitted when the user lifts the point of contact over the same DisplayObject instance on which the contact
         * was initiated on a touch-enabled device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户在触摸设备上与开始触摸的同一 DisplayObject 实例上抬起接触点时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOUCH_TAP: string;
        /**
         * @language en_US
         * Emitted when the user lifts the point of contact over the different DisplayObject instance on which the contact
         * was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display
         * object on a mobile phone or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户在触摸设备上与开始触摸的不同 DisplayObject 实例上抬起接触点时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        static TOUCH_RELEASE_OUTSIDE: string;
        /**
         * @language en_US
         * Creates an Event object that contains information about touch events.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number assigned to the touch point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 TouchEvent 对象，其中包含有关Touch事件的信息
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(type: string, bubbles?: boolean, cancelable?: boolean, stageX?: number, stageY?: number, touchPointID?: number);
        /**
         * @language en_US
         * The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 事件发生点在全局舞台坐标中的水平坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stageX: number;
        /**
         * @language en_US
         * The vertical coordinate at which the event occurred in global Stage coordinates.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 事件发生点在全局舞台坐标中的垂直坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stageY: number;
        private _localX;
        /**
         * @language en_US
         * The horizontal coordinate at which the event occurred relative to the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 事件发生点相对于所属显示对象的水平坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        localX: number;
        private _localY;
        /**
         * @language en_US
         * The vertical coordinate at which the event occurred relative to the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 事件发生点相对于所属显示对象的垂直坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        localY: number;
        private targetChanged;
        /**
         * @private
         */
        private getLocalXY();
        /**
         * @language en_US
         * A unique identification number assigned to the touch point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 分配给触摸点的唯一标识号
         * @version Lark 1.0
         * @platform Web,Native
         */
        touchPointID: number;
        /**
         * @language en_US
         * Instructs Lark runtime to render after processing of this event completes, if the display list has been modified.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         * @version Lark 1.0
         * @platform Web,Native
         */
        updateAfterEvent(): void;
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number (as an int) assigned to the touch point.
         *
         * @see lark.Event.create()
         * @see lark.Event.release()
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
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
         * @platform Web,Native
         */
        static emitTouchEvent(target: IEventEmitter, type: string, bubbles?: boolean, cancelable?: boolean, stageX?: number, stageY?: number, touchPointID?: number): boolean;
    }
}
declare module lark {
    /**
     * @language en_US
     * This class is used to create lightweight shapes using the drawing application program interface (API). The Shape
     * class includes a graphics property, which lets you access methods from the Graphics class.
     * @see lark.Graphics
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 此类用于使用绘图应用程序编程接口 (API) 创建简单形状。Shape 类含有 graphics 属性，通过该属性您可以访问各种矢量绘图方法。
     * @see lark.Graphics
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Shape extends DisplayObject {
        /**
         * @language en_US
         * Creates a new Shape object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Shape 对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  获取 Shape 中的 Graphics 对象。可通过此对象执行矢量绘图命令。
         * @version Lark 1.0
         * @platform Web,Native
         */
        graphics: Graphics;
    }
}
declare module lark {
    /**
     * @language en_US
     * The Bitmap class represents display objects that represent bitmap images.
     * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object.
     * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer
     * instance to place the bitmap on the display list.A Bitmap object can share its BitmapData reference among several
     * Bitmap objects, independent of translation or rotation properties. Because you can create multiple Bitmap objects
     * that reference the same BitmapData object, multiple display objects can use the same complex BitmapData object
     * without incurring the memory overhead of a BitmapData object for each display object instance.
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Bitmap 类表示用于显示位图图片的显示对象。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父级 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法可以将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与缩放或旋转属性无关。
     * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的 BitmapData 对象，
     * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生额外内存开销。
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Bitmap extends DisplayObject {
        /**
         * @language en_US
         * Initializes a Bitmap object to refer to the specified BitmapData object.
         * @param bitmapData The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个引用指定 BitmapData 实例的 Bitmap 对象
         * @param bitmapData 被引用的 BitmapData 实例
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(bitmapData?: BitmapData);
        /**
         * @language en_US
         * bitmapData The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的 BitmapData 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bitmapData: BitmapData;
        /**
         * @language en_US
         * Whether or not the bitmap is smoothed when scaled.
         * @default true。
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 控制在缩放时是否对位图进行平滑处理。
         * @default true。
         * @version Lark 1.0
         * @platform Web,Native
         */
        smoothing: boolean;
        private _pixelHitTest;
        /**
         * @language en_US
         * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
         * is set to true,the transparent area of the bitmap will be touched through.
         * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
         * the pixelHitTest property invalid.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。<br/>
         * 注意：若图片资源是以跨域方式从外部服务器加载的，将无法访问图片的像素数据，而导致此属性失效。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        pixelHitTest: boolean;
        /**
         * @private
         */
        private hitTestPixel(stageX, stageY);
    }
}
declare module lark.sys {
    /**
     * @private
     */
    const enum TextKeys {
        /**
         * @private
         */
        fontSize = 0,
        /**
         * @private
         */
        lineSpacing = 1,
        /**
         * @private
         */
        textColor = 2,
        /**
         * @private
         */
        textFieldWidth = 3,
        /**
         * @private
         */
        textFieldHeight = 4,
        /**
         * @private
         */
        textWidth = 5,
        /**
         * @private
         */
        textHeight = 6,
        /**
         * @private
         */
        textDrawWidth = 7,
        /**
         * @private
         */
        fontFamily = 8,
        /**
         * @private
         */
        textAlign = 9,
        /**
         * @private
         */
        verticalAlign = 10,
        /**
         * @private
         */
        colorString = 11,
        /**
         * @private
         */
        fontString = 12,
        /**
         * @private
         */
        text = 13,
        /**
         * @private
         */
        measuredWidths = 14,
        /**
         * @private
         */
        bold = 15,
        /**
         * @private
         */
        italic = 16,
        /**
         * @private
         */
        fontStringChanged = 17,
        /**
         * @private
         */
        textLinesChanged = 18,
        /**
         * @private
         */
        wordWrap = 19,
        /**
         * @private
         */
        displayAsPassword = 20,
        /**
         * @private
         */
        maxChars = 21,
        /**
         * @private
         */
        selectionActivePosition = 22,
        /**
         * @private
         */
        selectionAnchorPosition = 23,
    }
}
declare module lark {
    /**
     * @language en_US
     * The TextField class is used to create display objects for text display. You can use the methods and properties of
     * the TextField class to manipulate it.<br/>
     * In TextField, three character sequences are recognized as explicit line breaks: CR ("\r"), LF ("\n"), and CR+LF ("\r\n").<br/>
     * If you don't specify any kind of width for a TextField, then the longest line, as determined by these explicit line
     * breaks, determines the width of the TextField.<br/>
     * If you do specify some kind of width, then the specified text is word-wrapped at the right edge of the component's
     * bounds, because the default value of the wordWrap is true. If the text extends below the bottom of the component, it is clipped.<br/>
     * To disable this automatic wrapping, set the wordWrap to false. Then lines are broken only where the text contains
     * an explicit line break, and the ends of lines extending past the right edge is clipped.
     * @see lark.TextInput
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * TextField 类用于创建显示对象以显示文本。可以使用 TextField 类的方法和属性对文本字段进行操作。<br/>
     * 在 TextField 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。<br/>
     * 如果没有为 TextField 指定宽度，则由这些显式换行符确定的最长行确定 TextField 的宽度。<br/>
     * 如果指定了某个宽度，则指定文本将在组件边界的右边缘换行，因为 wordWrap 的默认值为 true。如果文本扩展到低于组件底部，则将被剪切。<br/>
     * 要禁用此自动换行，请将 wordWrap 设置为 false。这样的话，只有 text 包含显式换行符时才会换行，且将剪切超过右边缘的行尾。
     * @see lark.TextInput
     * @version Lark 1.0
     * @platform Web,Native
     */
    class TextField extends DisplayObject {
        /**
         * @language en_US
         * Creates a new TextField instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个TextField对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor(text?: string);
        /**
         * @language en_US
         * The name of the font to use, or a comma-separated list of font names.
         * @default "sans-serif"
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要使用的字体的名称或用逗号分隔的字体名称列表。
         * @default "sans-serif"
         * @version Lark 1.0
         * @platform Web,Native
         */
        fontFamily: string;
        /**
         * @language en_US
         * The size in pixels of text
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本的字号大小。
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        fontSize: number;
        /**
         * @language en_US
         * Specifies whether the text is boldface.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否显示为粗体。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        bold: boolean;
        /**
         * @language en_US
         * Determines whether the text is italic font.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否显示为斜体。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        italic: boolean;
        /**
         * @private
         *
         */
        private invalidateFontString();
        /**
         * @private
         * 获取字体信息的字符串形式。
         */
        private getFontString();
        /**
         * @language en_US
         * Horizontal alignment of text.
         * @default：lark.HorizontalAlign.LEFT
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本的水平对齐方式。
         * @default：lark.HorizontalAlign.LEFT
         * @version Lark 1.0
         * @platform Web,Native
         */
        textAlign: string;
        /**
         * @language en_US
         * Vertical alignment of text.
         * @default：lark.VerticalAlign.TOP
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文字的垂直对齐方式。
         * @default：lark.VerticalAlign.TOP
         * @version Lark 1.0
         * @platform Web,Native
         */
        verticalAlign: string;
        /**
         * @language en_US
         * An integer representing the amount of vertical space between lines.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个整数，表示行与行之间的垂直间距量
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        lineSpacing: number;
        /**
         * @language en_US
         * Color of the text.
         * @default 0x000000
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本颜色
         * @default 0x000000
         * @version Lark 1.0
         * @platform Web,Native
         */
        textColor: number;
        /**
         * @language en_US
         * A Boolean value that indicates whether the text field has word wrap. If the value of wordWrap is true, the text
         * field has word wrap; if the value is false, the text field does not have word wrap.
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
         * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。
         * @default true
         * @version Lark 1.0
         * @platform Web,Native
         */
        wordWrap: boolean;
        /**
         * @language en_US
         * A string to display in the text field.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要显示的文本内容
         * @version Lark 1.0
         * @platform Web,Native
         */
        text: string;
        /**
         * @private
         */
        private textLines;
        /**
         * @language en_US
         * Defines the number of text lines in a multiline text field. If wordWrap property is set to true, the number of
         * lines increases when text wraps.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  定义多行文本字段中的文本行数。如果 wordWrap 属性设置为 true，则在文本自动换行时会增加行数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        numLines: number;
        /**
         * @language en_US
         * The width of the text in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  文本内容宽度
         * @version Lark 1.0
         * @platform Web,Native
         */
        textWidth: number;
        /**
         * @language en_US
         * The height of the text in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  文本内容高度
         * @version Lark 1.0
         * @platform Web,Native
         */
        textHeight: number;
        /**
         * @private
         */
        private updateTextLines();
    }
}
declare module lark.sys {
    /**
     * @private
     * 返回格式化的字体样式文本
     */
    function toFontString(style: {
        fontFamily?: string;
        fontSize?: number;
        bold?: boolean;
        italic?: boolean;
    }): string;
    /**
     * @private
     * 返回字符串形式的颜色值
     */
    function toColorString(value: number): string;
}
declare module lark {
    /**
     * @language en_US
     * The Sprite class is a basic display list building block: a display list node that can contain children.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Sprite extends DisplayObject implements DisplayObjectContainer {
        /**
         * @language en_US
         * Creates a new Sprite instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 实例化一个容器
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        numChildren: number;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        addChild(child: DisplayObject): DisplayObject;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        /**
         * @private
         */
        private doAddChild(child, index);
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        contains(child: DisplayObject): boolean;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildAt(index: number): DisplayObject;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildIndex(child: DisplayObject): number;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        getChildByName(name: string): DisplayObject;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChild(child: DisplayObject): DisplayObject;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChildAt(index: number): DisplayObject;
        /**
         * @private
         */
        private doRemoveChild(index);
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        setChildIndex(child: DisplayObject, index: number): void;
        /**
         * @private
         */
        private doSetChildIndex(child, index);
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        swapChildrenAt(index1: number, index2: number): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        swapChildren(child1: DisplayObject, child2: DisplayObject): void;
        /**
         * @private
         */
        private doSwapChildrenAt(index1, index2);
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        removeChildren(): void;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        touchChildren: boolean;
        /**
         * @private
         */
        private markChildDirty(child, parentCache);
        /**
         * @private
         */
        private assignParentDisplayList(child, parentCache, newParent);
    }
}
declare module lark.sys {
    /**
     * @private
     * 显示列表
     */
    class DisplayList extends LarkObject implements Renderable {
        /**
         * @private
         * 释放一个DisplayList实例到对象池
         */
        static release(displayList: DisplayList): void;
        /**
         * @private
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        static create(target: DisplayObject): DisplayList;
        /**
         * @private
         * 创建一个DisplayList对象
         */
        constructor(root: DisplayObject);
        /**
         * @private
         * 呈现绘制结果的目标画布
         */
        surface: Surface;
        /**
         * @private
         */
        offsetX: number;
        /**
         * @private
         */
        offsetY: number;
        /**
         * @private
         * 显示列表根节点
         */
        root: DisplayObject;
        /**
         * @private
         */
        needRedraw: boolean;
        /**
         * @private
         */
        private rootMatrix;
        /**
         * @private
         * 绘图上下文
         */
        renderContext: RenderContext;
        /**
         * @private
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        setClipRect(width: number, height: number): void;
        /**
         * @private
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes;
        /**
         * @private
         */
        private dirtyNodeList;
        /**
         * @private
         * 标记一个节点需要重新渲染
         */
        markDirty(node: Renderable): void;
        /**
         * @private
         */
        private dirtyList;
        /**
         * @private
         */
        private dirtyRegion;
        /**
         * @private
         * 更新节点属性并返回脏矩形列表。
         */
        updateDirtyRegions(): Region[];
        /**
         * @private
         * 绘制根节点显示对象到目标画布，返回draw的次数。
         */
        drawToSurface(): number;
        /**
         * @private
         * 绘制一个显示对象
         */
        private drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayList, clipRegion);
        /**
         * @private
         */
        private drawWithClip(displayObject, context, dirtyList, rootMatrix, clipRegion);
        /**
         * @private
         */
        private drawWithScrollRect(displayObject, context, dirtyList, rootMatrix, clipRegion);
        /**
         * @private
         */
        private createRenderContext(width, height);
        /**
         * @private
         * 表示目标Surface首次被使用。
         */
        private sizeChanged;
        /**
         * @private
         * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
         */
        changeSurfaceSize(): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The TextInput class is used to create display objects for text display and input.The methods of the TextInput class
     * let you set, select, and manipulate the text inputted by a user.
     * @see lark.TextField
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * TextInput 类用于创建显示对象以显示和输入文本。TextInput 类的方法允许您设置、选择并操作用户输入的文本。
     * @see lark.TextField
     * @version Lark 1.0
     * @platform Web,Native
     */
    class TextInput extends TextField {
        /**
         * @language en_US
         * Creates a new TextInput instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 TextInput 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        constructor();
        /**
         * @language en_US
         * Specifies whether the text input is a password text input. If the value of this property is true, the text input
         * is treated as a password text input and hides the input characters using asterisks instead of the actual characters.
         * If false, the text input is not treated as a password text input.
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定输入框是否是密码输入框。如果此属性的值为 true，则输入框被视为密码输入框，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，
         * 则不会将输入框视为密码输入框。
         * @default false
         * @version Lark 1.0
         * @platform Web,Native
         */
        displayAsPassword: boolean;
        /**
         * @language en_US
         * The maximum number of characters that the text field can contain, as entered by a user. A script can insert more
         * text than maxChars allows; the maxChars property indicates only how much text a user can enter. If the value
         * of this property is 0, a user can enter an unlimited amount of text.
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 输入框中最多可包含的字符数（即用户输入的字符数）。代码方式可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可
         * 以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
         * @default 0
         * @version Lark 1.0
         * @platform Web,Native
         */
        maxChars: number;
        /**
         * @language en_US
         * A character position, relative to the beginning of the text string, specifying the end of the selection that
         * moves when the selection is extended with the arrow keys.The active position may be either the start or the
         * end of the selection.<br/>
         * For example, if you drag-select from position 12 to position 8, then selectionAnchorPosition will be 12 and
         * selectionActivePosition will be 8, and when you press Left-Arrow selectionActivePosition will become 7.<br/>
         * A value of -1 indicates "not set".
         * @default -1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对于 text 字符串开头的字符位置，用于指定用箭头键扩展选区时该选区的终点。活动位置可以是选区的起点或终点。<br/>
         * 例如，如果拖动选择位置 12 到位置 8 之间的区域，则 selectionAnchorPosition 将为 12，selectionActivePosition 将为 8，
         * 按向左箭头后 selectionActivePosition 将变为 7。<br/>
         * 值为 -1 时，表示“未设置”。
         * @default -1
         * @version Lark 1.0
         * @platform Web,Native
         */
        selectionActivePosition: number;
        /**
         * @language en_US
         * A character position, relative to the beginning of the text String, specifying the end of the selection that
         * stays fixed when the selection is extended with the arrow keys.The anchor position may be either the start or
         * the end of the selection.<br/>
         * For example, if you drag-select from position 12 to position 8, then selectionAnchorPosition will be 12 and
         * selectionActivePosition will be 8, and when you press Left-Arrow selectionActivePosition will become 7.<br/>
         * A value of -1 indicates "not set".
         * @default -1
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对于 text 字符串开头的字符位置，用于指定用箭头键扩展选区时该选区保持固定的终点。锚点位置可以是选区的起点或终点。<br/>
         * 例如，如果拖动选择位置 12 到位置 8 之间的区域，则 selectionAnchorPosition 将为 12，selectionActivePosition 将为 8，
         * 按向左箭头后 selectionActivePosition 将变为 7。<br/>
         * 值为 -1 时，表示“未设置”。
         * @default -1
         * @version Lark 1.0
         * @platform Web,Native
         */
        selectionAnchorPosition: number;
        /**
         * @language en_US
         * Selects a specified range of characters.<br/>
         * If either position is negative, it will deselect the text range.
         * @param anchorPosition The character position specifying the end of the selection that stays fixed when the selection is extended.
         * @param activePosition The character position specifying the end of the selection that moves when the selection is extended.
         * @see #selectionAnchorPosition
         * @see #selectionActivePosition
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 选择指定范围的字符。<br/>
         * 如果任一位置为负，则它将取消选择该文本范围。
         * @param anchorPosition 字符位置，用于指定扩展选区时保持固定的选区的未端。
         * @param activePosition 字符位置，用于指定扩展选区时移动的选区的未端。
         * @see #selectionAnchorPosition
         * @see #selectionActivePosition
         * @version Lark 1.0
         * @platform Web,Native
         */
        selectRange(anchorPosition: number, activePosition: number): void;
        /**
         * @private
         */
        private _isTyping;
        /**
         * @private
         */
        private _isFocus;
        /**
         * @private
         */
        private handleTouchBegin(e);
        /**
         * @private
         */
        private setAsCurrent();
        /**
         * @private
         */
        private timeoutId;
        /**
         * @private
         */
        private updateTextAdapter();
    }
}
declare module lark {
    /**
     * @language en_US
     * The Stage class represents the main drawing area.The Stage object is not globally accessible. You need to access
     * it through the stage property of a DisplayObject instance.<br/>
     * The Stage class has several ancestor classes — Sprite, DisplayObject, and EventEmitter — from which it inherits
     * properties and methods. Many of these properties and methods are inapplicable to Stage objects.
     * @event lark.Event.RESIZE Emitted when the stageWidth or stageHeight property of the Stage object is changed.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Stage 类代表主绘图区。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。<br/>
     * Stage 类具有多个祖代类: Sprite、DisplayObject 和 EventEmitter，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     * @event lark.Event.RESIZE 当stageWidth或stageHeight属性发生改变时调度
     * @version Lark 1.0
     * @platform Web,Native
     */
    class Stage extends Sprite {
        /**
         * @private
         * Stage不许允许自行实例化
         */
        constructor();
        /**
         * @language en_US
         * Gets and sets the frame rate of the stage. The frame rate is defined as frames per second. Valid range for the
         * frame rate is from 0.01 to 1000 frames per second.<br/>
         * Note: setting the frameRate property of one Stage object changes the frame rate for all Stage objects
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。<br/>
         * 注意: 修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
         * @default 30
         * @version Lark 1.0
         * @platform Web,Native
         */
        frameRate: number;
        /**
         * @language en_US
         * Indicates the width of the stage, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台的当前宽度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stageWidth: number;
        /**
         * @language en_US
         * Indicates the height of the stage, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台的当前高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stageHeight: number;
        /**
         * @language en_US
         * A value from the StageScaleMode class that specifies which scale mode to use.
         * @see lark.StageScaleMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 一个 StageScaleMode 类中的值，指定要使用哪种缩放模式。
         * @see lark.StageScaleMode
         * @version Lark 1.0
         * @platform Web,Native
         */
        scaleMode: string;
        /**
         * @language en_US
         * After you call the invalidate() method, when the display list is next rendered, the Lark runtime sends a render
         * event to each display object that has registered to listen for the render event. You must call the invalidate()
         * method each time you want the Lark runtime to send render events.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        invalidate(): void;
        /**
         * @private
         */
        private implMap;
        /**
         * @language en_US
         * Adds an interface-name-to-implementation-class mapping to the registry.
         * @param interfaceName the interface name to register. For example："swan.IAssetAdapter","swan.Theme"
         * @param instance the instance to register.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册一个接口实现。
         * @param interfaceName 注入的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @param instance 实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        registerImplementation(interfaceName: string, instance: any): void;
        /**
         * @language en_US
         * Returns the singleton instance of the implementation class that was registered for the specified interface.
         * This method is usually called by lark framework.
         * @param interfaceName The interface name to identify. For example："swan.IAssetAdapter","swan.Theme"
         * @returns the singleton instance of the implementation class
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取一个接口实现。此方法通常由框架内部调用。获取项目注入的自定义实现实例。
         * @param interfaceName 要获取的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @returns 返回实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        getImplementation(interfaceName: string): any;
    }
}
declare module lark.sys {
    /**
     * @private
     * Lark播放器
     */
    class Player extends LarkObject {
        /**
         * @private
         * 实例化一个播放器对象。
         */
        constructor(context: RenderContext, stage: Stage, entryClassName: string);
        /**
         * @private
         */
        private createDisplayList(stage, context);
        /**
         * @private
         */
        private screenDisplayList;
        /**
         * @private
         * 入口类的完整类名
         */
        private entryClassName;
        /**
         * @private
         * 舞台引用
         */
        stage: Stage;
        /**
         * @private
         * 入口类实例
         */
        private root;
        /**
         * @private
         */
        private isPlaying;
        /**
         * @private
         * 启动播放器
         */
        start(): void;
        /**
         * @private
         *
         */
        private initialize();
        /**
         * @private
         * 停止播放器，停止后将不能重新启动。
         */
        stop(): void;
        /**
         * @private
         * 暂停播放器，后续可以通过调用start()重新启动播放器。
         */
        pause(): void;
        /**
         * @private
         * 更新舞台尺寸
         * @param stageWidth 舞台宽度（以像素为单位）
         * @param stageHeight 舞台高度（以像素为单位）
         */
        updateStageSize(stageWidth: number, stageHeight: number): void;
        /**
         * @private
         * 显示FPS，仅在DEBUG模式下有效。
         */
        displayFPS: (showFPS: boolean, showLog: boolean, logFilter: string, logColor: number) => void;
        /**
         * @private
         */
        private showFPS;
        /**
         * @private
         */
        private showLog;
        /**
         * @private
         */
        private fpsDisplay;
        /**
         * @private
         * 是否显示脏矩形重绘区，仅在DEBUG模式下有效。
         */
        showPaintRect: (value: boolean) => void;
        /**
         * @private
         */
        private drawDirtyRect;
        /**
         * @private
         */
        private _showPaintRect;
        /**
         * @private
         */
        private stageDisplayList;
        /**
         * @private
         */
        private paintList;
        /**
         * @private
         */
        private drawPaintRect;
    }
    /**
     * @private
     */
    var $logToFPS: (info: string) => void;
}
