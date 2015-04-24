//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////



module lark {
    export class Text extends Sprite {
        bitmapData: BitmapData = null;
        public constructor() {
            super();
            var img = new Image();
            img.src = "http://tp2.sinaimg.cn/2078341137/50/5619181703/1";
            img.onload = () => {
                this.bitmapData = img;
                this.createChildren(img)
            }
            
        }

        createChildren(bitmapData: BitmapData) {
            this.removeChildren();
            this.addChild(FPS.display);
            var bitmap = new Bitmap();
            bitmap.bitmapData = bitmapData;
            bitmap.width = bitmap.height = 200;
            var bitmap2 = new Bitmap();
            bitmap2.bitmapData = bitmapData;



            var style: ITextStyle = {
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize:30
            };



            var text = "Hi:    3455 \n"
                + " World setTimeout(() => rich.width = this.stage? this.stage.stageWidth : 500, 300); \n "
                + " World setTimeout(() => rich.width = this.stage ? this.stage.stageWidth : 500, 300); \\n World";
            var tf = new TextField(text);
            tf.style = { align: "left", color: 0xFF0000 };
            tf.width = 400;
            tf.multiline = true;
            tf.y = 200;
            this.addChild(tf);

            var rich = new lark.RichTextField({ fontSize: 30,align:"right" });
            rich.y = 50;
            rich.width = 500;
            rich.height = 500;
            rich.nodes = ['Hi ', {
                    text: " Hi how are you",
                    style: { color: 0xFF0000 }
            }, bitmap, {
                    graphic: bitmap2,
                    style: {
                        float:"left"
                    }
            }, {
                    src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                    height: 50,
                    width: 50,
                    style: {
                        float:"right"
                    }
            },
                "faj s dhfa sdf as df asd \n s \n s \n s \nf as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
                },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "right"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
                "faj s dhfa sdf as df asd f as df a sdf as df a sdf asd fa",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer ",
            {
                src: "http://tp2.sinaimg.cn/2078341137/50/5619181703/1",
                height: 50,
                width: 50,
                style: {
                    float: "left"
                }
            },
                "df sd fsd sdf sdf fd s df dfs we rer ewr r wer  ewr rew wer "];
            this.addChild(rich);
            
            window.addEventListener("mousewheel", e=> {
                rich.scrollV += (e.wheelDelta > 0 ? 1 : -1);
                if (rich.scrollV < 0)
                    rich.scrollV = 0;
            });
        }

        
        colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF, 0xFFFF00, 0xFF00FF];
        getRandomColor() {
            var random = Math.random() * this.colors.length;
            random = Math.floor(random);
            return this.colors[random];
        }
    }
}



