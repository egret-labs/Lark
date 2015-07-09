#Lark Core 编程指南 - 缓存显示对象
如果一个对象内部有很多复杂矢量内容，我们可以使用 cacheAsBitmap 这个方法将该对象缓存为内部位图，从而优化性能。
```  TypeScript
//显示对象启用位图缓存
mySprite.cacheAsBitmap = true;
```
缓存后执行速度可能会大大加快，具体取决于显示对象内容的复杂性。

使用 cacheAsBitmap 的对象，内部最好是静态内容，且不频繁缩放或旋转。

注意：在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
