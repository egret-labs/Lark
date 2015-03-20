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
    export class Text extends DisplayObjectContainer {
        texture: Texture = null;
        public constructor() {
            super();
            var img = new Image();
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=";
            img.onload = () => {
                var texture: Texture = new Texture();
                texture.$setBitmapData(img);
                this.texture = texture;
                this.createChildren(texture)
            }
            
            window.addEventListener("resize", e=> {
                setTimeout(() => this.createChildren(this.texture), 300);
            });
        }

        createChildren(texture: Texture) {
            this.removeChildren();
            this.addChild(FPS.display);
            var bitmap = new Bitmap();
            bitmap.texture = texture;
            var bitmap2 = new Bitmap();
            bitmap2.texture = texture;


            var htmlText = '<p id=\"demo\">Hello World <img  height="100" width="100" float="left" src=\"http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/logo/logo_biz_7_00cf31a.gif\" alt=\"\" />'
                + 'Hello World Hello World Hello World Hello World Hello!<img height="100" width="100" float="right" src=\"http://ejohn.org/files/jeresig-full-profile-2013.48.jpg\" alt=\"\" />'
                + ' World Hello World Hello !<img height="50" width="50" src=\"image/icon.png\" float="right" alt=\"\" />World Hello World Hello World Hello World Hello World Hello World Hello World Hello World'
                + ' Hello World Hello World Hello World Hello World Hello World <img height="30" width="30" src=\"image/icon.png\" alt=\"\" />Hello World Hello World Hello World Hello World \n    </p>';

            var dom = new DOMParser().parseFromString(htmlText, "text/xml");
            var root = dom.documentElement;
            var length = root.childNodes.length;
            var format = new TextFormat();
            format.fontDescription = new text.FontDescription("'Microsoft YaHei'");
            format.float = TextFloat.RIGHT;
            format.fontSize = 24;
            var contentElements:text.ContentElement[] = []

            for (var i = 0; i < length; i++) {
                var node = root.childNodes[i];
                if (node.nodeType == node.TEXT_NODE) {
                    var te = new text.TextElement(node.textContent, format);
                    contentElements.push(te);
                }
                else if (node.nodeName == "img") {
                    var bitmap = new Bitmap();
                    bitmap.texture = texture;
                    var image = new Image();
                    ((image, bitmap:Bitmap)=> {
                        image.src = node.attributes.getNamedItem("src").value;
                        image.onload = e=> {
                            var tx = new Texture();
                            tx.$setBitmapData(image);
                            var w = bitmap.width, h = bitmap.height;
                            bitmap.texture = tx;
                            bitmap.width = w;
                            bitmap.height = h;
                        };
                    })(image, bitmap);
                    var ge = new text.GraphicElement(bitmap, void (0), void (0), format);
                    var heightAttr = node.attributes.getNamedItem("height");
                    if (heightAttr) {
                        ge.elementHeight = parseFloat(heightAttr.value);
                    }
                    var heightAttr = node.attributes.getNamedItem("width");
                    if (heightAttr) {
                        ge.elementWidth = parseFloat(heightAttr.value);
                    }
                    var float = node.attributes.getNamedItem("float");
                    var f = format.clone();
                    if (float) {
                        f.float = float.value || "";
                    }
                    else {
                        f.float = "";
                    }
                    ge.elementFormat = f;
                    contentElements.push(ge);
                }
            }

            var str = "😊☺️😉😍😘Skinning the Chrome Developer Tools Revisited - 11+ themes now available\n\nBack in 2011, +Darcy Clarke  wrote a kick-ass post about how to skin the Chrome Developer Tools with your own custom stylesheet. The basic idea was to locate Chrome's user stylesheet directory then drop-in your own Custom.css file.\n\nA few of you wrote in after noticing our custom-themed DevTools on the Breakpoint, so I thought I'd remind you about Darcy's post (http://darcyclarke.me/design/skin-your-chrome-inspector/) and share a whole bunch of themes written over the past year. Some of them include further theming to the console, icons and other panels.\n\nDevTools Themes:\n\n* MNML Theme: https://github.com/frontdevDE/mnml-devtools-theme \n(pictured. also themes Elements panel, headers/bars, console and more.) by +Michael P. Pfeiffer \n* Monokai Dark: https://gist.github.com/bc12d6bb85ffb96042e8 (also pictured)\n* Tomorrow Theme: https://gist.github.com/1163300 (one of many by the awesome +Benjamin Truyman)\n* IR_Black Theme: https://gist.github.com/1150520\n(and with sidebar colors: https://gist.github.com/1245727)\n* Solarized Dark https://gist.github.com/2174604 by +François Robichet \n* Ruby Blue: https://github.com/chrisbateman/ChromeDevToolsTheme-RubyBlue/\n* Expresso: https://gist.github.com/1207219\n* Inversion: https://github.com/mohsen1/Chrome-Dev-tools-dark-theme\n* Dark Theme: https://github.com/xajler/chrome-devtools-dark-theme\n* Dark Dev: https://github.com/simonsmith/DarkDev\n* WebLight Theme: https://gist.github.com/1325072\n\nSome tips:\n* You can tweak your skin for the DevTools using the DevTools themselves by undocking them then hitting Ctrl-Alt-i or Cmd+alt+i on Mac. DevToolsCeption!\n* We expose the classes/IDs you can theme via chrome-devtools:devtools/devTools.css\n\nDisclaimer:\nPlease note: custom themes are unofficial and may potentially break existing DevTools functionality. As always, if you encounter bugs with the DevTools, please report them via crbug.com, but disable the theme and test again, first. ;)﻿\n\nAddy Osmani的照片\n951419Daniel Noland的个人资料照片Doğa Armangil的个人资料照片Dmitriy Schekhovtsov的个人资料照片Andre Bulatov的个人资料照片\n146 条评论\n\nSungguk Lim2012年10月17日\n\n\n \n \nawesome!﻿\n翻译\n\nSujay Krishna Suresh2012年10月17日+5\n6\n5\n \n \nThe Sublime Text look feels good!﻿\n翻译\n\nAndreas S.2012年10月17日+4\n5\n4\n \n \nI'd like to give a +11 for that :)﻿\n翻译\n\nZeno Rocha2012年10月17日\n\n\n \n \nawesome!﻿\n翻译\n\nAlessandro Muraro2012年10月17日\n\n\n \n \nand how would i install these exactly? :)﻿\n翻译\n\nAddy Osmani2012年10月17日+9\n10\n9\n \n \n+Alessandro Muraro \n\n1. Find Chrome's user stylesheet's directory\n\nWindows: \"C:\Users\**Your username**\AppData\Local\Google\Chrome\User Data\Default\User StyleSheets\\\"\nMac: \"~/Library/Application Support/Google/Chrome/Default/User StyleSheets/\"\nLinux: \"~/.config/chrome/Default/User StyleSheets/\" \n\n2. Replace the existing \"Custom.css\" file with one of the alternatives\n\n3. Profit :)﻿\n翻译\n\nAlessandro Muraro2012年10月17日\n\n\n \n \nsweet! ﻿\n翻译\n\nMichael P. Pfeiffer2012年10月17日+5\n6\n5\n \n \n+Addy Osmani just to be picky my theme is called \"mnml\" ;)﻿\n翻译\n\nAddy Osmani2012年10月17日+3\n4\n3\n \n \n+Michael P. Pfeiffer thanks for catching that! Corrected :)﻿\n翻译\n\nAlessandro Muraro2012年10月17日\n\n\n \n \nmmh it's not working though :( i must have done something wrong!﻿\n翻译\n\nAddy Osmani2012年10月17日\n\n\n \n \n+Alessandro Muraro if it doesn't take effect, be sure to restart Chrome and check you're on your primary user account (if using Chrome profiles).﻿\n翻译\n\nsimurai plus2012年10月17日+4\n5\n4\n \n \nA theme gallery with screenshots would be great.﻿\n翻译\n\nAddy Osmani2012年10月17日+3\n4\n3\n \n \n+simurai plus I was thinking the same thing after writing this post. Maybe its something we should LazyWeb request +Paul Irish? :)﻿\n翻译\n\nAddy Osmani2012年10月17日+2\n3\n2\n \n \nAwesome +Aamir Afridi!﻿\n翻译\n\nEduardo Matos2012年10月17日\n\n\n \n \nThis is amazing! Imagine a near future where we no longer need editors!!! =D﻿\n翻译\n\nMohsen Azimi2012年10月17日+3\n4\n3\n \n \nI have my own dark theme that is written with CSS filters. \nhttp://mohsenweb.com/chrome-developer-tools-dark-theme/﻿\n翻译\n\nPhenomen Dzhafa2012年10月17日\n\n\n \n \nmore or less we'll need them always. (editors)﻿\n翻译\n\nEduardo Matos2012年10月17日+6\n7\n6\n \n \nGood approach Moshen Az!!﻿\n翻译\n\nJonathan Neufeld2012年10月17日\n\n\n \n \nI don't suppose skins include keyboard navigation support?﻿\n翻译\n\nSun Panha2012年10月17日\n\n\n \n \nnice﻿\n翻译\n\nscott addison2012年10月17日\n\n\n \n \ncool﻿\n翻译\n\nvinod yadav2012年10月17日\n\n\n \n \nMAD WORLD﻿\n翻译\n\nFurqan Shaikh2012年10月17日\n\n\n \n \nyour typical tactics.﻿\n翻译\n\nHelge Grimm2012年10月17日+3\n4\n3\n \n \nExtra +1 to +Michael P. Pfeiffer  for his .less template﻿\n翻译\n\nAddy Osmani2012年10月17日\n\n\n \n \n+Jonathan Neufeld Just visual customisations to the DevTools UI :)﻿\n翻译\n\nZeno Rocha2012年10月17日\n\n\n \n \nOh, I couldn't not write a blogpost & record a video after seeing that :) http://tableless.com.br/tunando-o-developer-tools-do-google-chrome/﻿\n翻译\n\nGiorgos Kotsakis2012年10月17日\n\n\n \n \nVery much like! \n﻿\n翻译\n\nAddy Osmani2012年10月17日+1\n2\n1\n \n \nAwesome +Zeno Rocha! :) Real glad theres interest in these themes. Could you link back to this G+ in case anyone reading your version is after the english equiv?\n\n+Mohsen Az that is awesome. Nice work!﻿\n翻译\n\nBenjamin Pritchett2012年10月17日\n\n\n \n \nI love Java Script. Anyone that can't read that is a fucking sped! And or ned!﻿\n翻译\n\nJonathan Beri2012年10月17日\n\n\n \n \n+Addy Osmani I noticed some of the themes affect the whole console and some do not. Is MNML the only one the changes the whole lot? I would love to have Monokai everywhere :)﻿\n翻译\n\nAddy Osmani2012年10月17日+2\n3\n2\n \n \n+Jonathan Beri I believe MNML is the most comprehensive, but you could take a look at the selectors its using and apply them to the Monokai theme. I've just pinged the developer of it to see if they'd be interested in extending :)﻿\n翻译\n\nZeno Rocha2012年10月17日\n\n\n \n \nYeah, for sure Addy.﻿\n翻译\n\nAddy Osmani2012年10月17日\n\n\n \n \nThanks!﻿\n翻译\n\nWade Armstrong2012年10月17日\n\n\n \n \nWow, great post - this is a must-do!﻿\n翻译\n\njordan harris2012年10月17日\n\n\n \n \nnice :)﻿\n翻译\n\nRobert Fauver2012年10月17日+4\n5\n4\n \n \nWhat happened to the \"Dock to Right\" setting in Chrome Canary?﻿\n翻译\n\nRonny Orbach2012年10月17日+4\n5\n4\n \n \nGlad to this gets some exposure :-)\nI suggested that to +Paul Irish around the time Darcy did, and it saddens me this still got almost no traction. I guess what we really need is a themes gallery and a built-in theme switcher - Think Firefox Personas.\n\nWe might be able to develop that as a devtools extension, but it's experimental (as in Non-Webstore-Qualified). It would be superb to have this baked in. WDYT?﻿\n翻译\n\nDion Igoniwari2012年10月17日\n\n\n \n \nGreat\n﻿\n翻译\n\nRonny Orbach2012年10月17日\n\n\n \n \nBTW, +Michael P. Pfeiffer got it right with mnml - He put there some nice extra touches other than color scheme - Mostly padding. I also saw one of the themes changed the tabs to use small icons only, which is cool.\n\nLet's see who can come up with something truly different - Think transforms, transitions, alternative icons... Could be awesome-r.﻿\n翻译\n\nAddy Osmani2012年10月17日+1\n2\n1\n \n \n+Robert Fauver In canary, dock to right can also be accessed via the layout switcher button (bottom left of the DevTools). Hold down the button and you can toggle between dock to right and default.\n\n+Ronny Orbach a themes gallery seems like a good start. How would you imagine a theme switcher working? Allowing developers to just select an external theme file/stylesheet to use? A switcher first implemented as an extension would be useful to see.﻿\n翻译\n\nRonny Orbach2012年10月17日\n\n\n \n \nEssentially, Firefox really got it right with Personas. Built in, only needs a mouseover to preview (on their specific website for security reasons), and it used to install instantly.\nAnother app which did a similar theme/gallery integration is Winamp with their AVS.\n\nProvide two to five 'local' themes (which could really be just the top-five from the gallery) and a 'Get more devtools themes' button.\n\nI agree but come to think about it, I don't think it's possible without building a special fork of DevTools - FileSystem API doesn't allow writing to folders outside of the browser sandbox. (Also bugs me on another project, cough :-))\n\nSo for now I could do mockups if that helps.﻿\n翻译\n\nAddy Osmani2012年10月17日\n\n\n \n \n+Ronny Orbach I'd be interested to hear what +Paul Irish and +Pavel Feldman think about that idea. I know there are probably more high priority items to tackle for the time being, but could be potentially considered for the future.﻿\n翻译\n\nRonny Orbach2012年10月17日+4\n5\n4\n \n \nOf course there are higher priorities for the core team - That's why it would be wise to let the community change about everything inside devtools ASAP, so we could build our own fun/nice to have stuff while you build serious/useful features ;-)﻿\n翻译\n\nElbie Kapsjr2012年10月17日\n\n\n \n \nIncredible﻿\n翻译\n\nRobert Fauver2012年10月17日\n\n\n \n \nGot it working now, Thanks Addy!﻿\n翻译\n\nAngus Pearson2012年10月17日+5\n6\n5\n \n \n\"Yo Dawg, I heard you like CSS so I CSSed your CSS checker!\"﻿\n翻译\n\nMichael P. Pfeiffer2012年10月17日+3\n4\n3\n \n \n+Ronny Orbach thx! As this joined some traction I sure will pimp the \"mnml theme\" even more in the next days :)﻿\n翻译\n\nSani Garba2012年10月17日\n\n\n \n \nVery nice, how does it fit?.﻿\n翻译\n\nVincent Mac2012年10月17日+1\n2\n1\n \n \nAdd one more to the list. https://github.com/vincentmac/enlightened-devtools-theme\nThanks to +Michael P. Pfeiffer for the .less template in your repo.﻿\n翻译\n\nKonstantin Gratchev2012年10月17日+4\n5\n4\n \n \nvi forever﻿\n翻译\n\nDerrick Jackson2012年10月17日\n\n\n \n \nNice ﻿\n翻译\n\nJimbe' Carroll2012年10月17日+2\n3\n2\n \n \nBrillaint ! Love this on the black ! ﻿\n翻译\n\nTino Trueman2012年10月17日\n\n\n \n \nTime to try it.﻿\n翻译\n\nRyan Steele2012年10月17日+1\n2\n1\n \n \nSPACE﻿\n翻译\n\nJoey Sun2012年10月17日\n\n\n \n \ncall me a nerd but i no what all this says﻿\n翻译\n\nAndrew Van Epp2012年10月17日+4\n5\n4\n \n \n^Know....﻿\n翻译\n\nJoey Sun2012年10月17日\n\n\n \n \nwho cares﻿\n翻译\n\nGraham Bowen2012年10月17日\n\n\n \n \nsay what!!!!!!﻿\n翻译\n\nJoey Sun2012年10月17日\n\n\n \n \nbasically the left has stuff about like the layouts, and the right says stuff about extensions﻿\n翻译\n\nAndrew Van Epp2012年10月17日+1\n2\n1\n \n \nit was just an ironic statement that you made... you know semi advanced information on the computer but not the \"no, know\" grammar rule.﻿\n翻译\n\nJohnny Redcorn2012年10月17日\n\n\n \n \n<---  Nodding in approval (Pretending that I know what I'm looking at)﻿\n翻译\n\nkillua kaito2012年10月17日\n\n\n \n \nok﻿\n翻译\n\ndustin lillard2012年10月17日+2\n3\n2\n \n \nAmazing simply Amazing..﻿\n翻译\n\nJoey Sun2012年10月17日\n\n\n \n \nyeah lets let notch and valve challenge that﻿\n翻译\n\nJeremy Bao2012年10月17日\n\n\n \n \nVery cool﻿\n翻译\n\nvikas shinde2012年10月17日\n\n\n \n \nnice﻿\n翻译\n\nSun Panha2012年10月17日\n\n\n \n \ninspect elements of google chrome :D﻿\n翻译\n\nTrevor Ray2012年10月17日\n\n\n \n \nBrilliant. Never thought of skinning chrome's stylesheets.﻿\n翻译\n\nAbhi Nash2012年10月17日\n\n\n \n \nRight click>Inspect Element﻿\n翻译\n\nTrevor Ray2012年10月17日\n\n\n \n \nAlso Ctrl+Shift+I﻿\n翻译\n\nBradford Roberson2012年10月17日\n\n\n \n \nYou know your shit is hot when everyone starts posting \"incredible\", \"awesome\", and my personal favorite \"I don't know what it is\". \n\nC'mon guys, rtfa.﻿\n翻译\n\nriyo comel2012年10月17日\n\n\n \n \nok﻿\n翻译\n\n小鳥遊王顕2012年10月17日\n\n\n \n \nHow do I install the theme﻿\n翻译\n\nÁlvaro Pérez De Pieri2012年10月17日\n\n\n \n \nCool!﻿\n翻译\n\nMichael S2012年10月17日\n\n\n \n \nIs there a way to apply the skin to the Scripts tab as well?﻿\n翻译\n\nFrançois Robichet2012年10月17日\n\n\n \n \n+Addy Osmani I passed my Solarized Dark theme on GitHub instead of Gist last week if you can edit the link :) https://github.com/Calvein/solarized-dark-skin-chrome-devtools﻿\n翻译\n\nAddy Osmani2012年10月17日+1\n2\n1\n \n \n+Timothy Wang Check out Darcy's blog post (linked in this one)\n\n+Michael S Do you mean the Sources tab? For that you can style .scripts (e.g .scripts .split-view, .scripts .split-view-contents, .scripts .split-view-sidebar-right and so on. Try out inspecting the tools with the tools (listed in my tip). You'll be able to easily find the classes for almost any panel in the tools :)﻿\n翻译\n\nBen Truyman2012年10月17日\n\n\n \n \n+Addy Osmani you might also like my LESSified version that uses variables for many of the colors: https://gist.github.com/3040634 Still needs work though.﻿\n翻译\n\nAddy Osmani2012年10月17日\n\n\n \n \nThanks for the heads up +Benjamin Truyman! :)﻿\n翻译\n\nriyo comel2012年10月17日\n\n\n \n \nit's very simple...﻿\n翻译\n\nMichael P. Pfeiffer2012年10月18日+2\n3\n2\n \n \nMade further refinements to the \"mnml theme\" with more additions coming soon. Watch it at https://github.com/frontdevDE/mnml-devtools-theme ﻿\n翻译\n\nDavid Pett2012年10月18日\n\n\n \n \nI dock my dev tools to the right, I noticed that the toolbar was not styled with the dark theme pictured, I found in the Custom.css that it targets .compact toolbar, if you remove the .compact you will see the dark theme in the sidebar and the detached views﻿\n翻译\n\nAddy Osmani2012年10月18日\n\n\n \n \n+Robert Petras Here you go https://gist.github.com/3862950 :)﻿\n翻译\n\nBima Arafah2012年10月19日\n\n\n \n \nIR_Black FTW!﻿\n翻译\n\nNatalia Ventre2012年10月20日\n\n\n \n \nNow it's going to be much more fun to inspect elements. Thanks for the list of themes!﻿\n翻译\n\nBen Truyman2012年10月21日+2\n3\n2\n \n \n+Addy Osmani I just released this: https://github.com/bentruyman/devtools-themes﻿\n翻译\n\nAddy Osmani2012年10月21日\n\n\n \n \n+Benjamin Truyman So much awesome! great work.﻿\n翻译\n\nLasse Küchler2012年10月24日+2\n3\n2\n \n \n+Addy Osmani I am working on a dark and simple theme.\nThe navigation will move out of the inspector if its not needed.\nhttps://github.com/LKuechler/LittleShadow﻿\n翻译\n\nAddy Osmani2012年10月24日\n\n\n \n \nThats slick, +Lasse Küchler :) Nice work!﻿\n翻译\n\nRemy Bach2012年10月24日+2\n3\n2\n \n \nOops... only just seen that there's another twilight theme kicking around. Oh well... I made my own one too (based off of MNML so the toolbar is still dark too): https://github.com/remybach/chrome-twilight\n\nIf any of you feel like improving it, please fix it and submit a pull request!﻿\n翻译\n\nPascal Kremp2012年11月1日+3\n4\n3\n \n \nHey all. This post inspired me to create http://devthemez.com. It's a platform for submitting and browsing themes for web developer's toys. Feel free to submit your themes! Thanks to +Addy Osmani !﻿\n翻译\n\nRemy Bach2012年11月1日+1\n2\n1\n \n \nThat's pretty awesome! Nice one Pascal!﻿\n翻译\n\nScott Buchanan2012年11月4日\n\n\n \n \nhttps://gist.github.com/3695228#file_custom.css\nIncludes .scss too if you're interested... http://i.imgur.com/BboEZ.png﻿\n翻译\n\nArtem Z2012年11月17日\n\n\n \n \nIn Mountain Lion - chflags nohidden ~/Library   in Terminal !﻿\n翻译\n\nAngus Neil2012年11月18日+1\n2\n1\n \n \nFirebug theme - not fully tested but feels a bit more like home. \nhttp://pastebin.com/dYMDYaZs﻿\n翻译\n\nElijah Lynn2012年12月5日\n\n\n \n \nFor some reason I can't get the Custom.css to load. Do I need to restart Chrome for this to work? I have tried but I am on Ubuntu and not sure if it needs a kill.\n\nUpdate: Nevermind, I was in chromium not google-chrome.﻿\n翻译\n\nRemy Bach2012年12月5日+1\n2\n1\n \n \nI recently got caught by that too. Take note that if you install Chrome Canary/Dev, the config is in a separate folder to your normal install. I'm not on my Ubuntu machine now, but I think it's called `google-chrome-dev` iirc.﻿\n翻译\n\nJason M2013年1月29日\n\n\n \n \nAwesome ;) loving mnml﻿\n\nJason M2013年1月29日\n\n\n \n \nWorks fine with Chromium too ;) swap out the relevant pathname.﻿\n翻译\n\nGregory Lewis2013年2月1日\n\n\n \n \nI cant replace or delete the custom.css file on my mac for reason.  does anybody have a solution??﻿\n翻译\n\nRemy Bach2013年2月1日\n\n\n \n \nClose Chrome and try do it then.﻿\n翻译\n\nJason M2013年2月1日\n\n\n \n \nGregory Lews - it should update automatically, but if you close Chrome first and then replace Custom.css, then start up Chrome again, you should be ok.﻿\n翻译\n\nKenichi Kashiwagi2013年2月1日\n\n\n \n \nGreat! Thanx!﻿\n翻译\n\nRob Garrison2013年3月13日+1\n2\n1\n \n \nCheck out this interactive codepen (http://codepen.io/Mottie/pen/nyoIl), I just made using Benjamin Truyman's LESS code from his github repo.﻿\n翻译\n\nAddy Osmani2013年3月13日\n\n\n \n \nVery neat :)﻿\n翻译\n\nJason M2013年3月13日\n\n\n \n \nWish I could find the css classes for the console styles, anyone know how to style the lines in-between console messages?﻿\n翻译\n\nJason M2013年3月13日\n\n\n \n \ngot it!\n\n#-webkit-web-inspector .console-message, #-webkit-web-inspector .console-user-command ﻿\n翻译\n\nJason M2013年3月13日\n\n\n \n \nOne more for the pile... https://github.com/jasonm23/bleupunkt-custom-css﻿\n翻译\n\nIker Garitaonandia2013年3月27日\n\n\n \n \nI will add this lines on the MNML Custom.css after line 472.\n\n#-webkit-web-inspector .outline-disclosure ol li {\n  line-height: 16px;\n}\n#-webkit-web-inspector .outline-disclosure ol li.selected {\n  line-height: 16px;\n}﻿\n翻译\n\nOliver Prucha2013年3月28日+1\n2\n1\n \n \nDuuuuude.  This is too awesome.  Thanks for this post!  Love my Soda dark themed Sublime, and the bright white chrome dev tools were killing me.﻿\n翻译\n\nAdonis K.2013年4月8日\n\n\n \n \nAddy couldn't this become more official by using a different way to approach it? Here is my suggestion:\n\nFor starters instead of using CSS rules to style it, the user'd give a preferred color palette and then the DevTools will overwrite its current colors with the given colors from the color palette (the color palette can be either a series of strings or maybe a photoshop palette file?).\n\nIt could become even better if devTools would use icon glyphs instead of images so later the user will be able to colorize them as well.﻿\n翻译\n\nSimon Owen2013年4月8日+1\n2\n1\n \n \nLove this! Currently working on:\nhttps://github.com/simonowendesign/SO-Dark-Monokai-v3\n\nAdded screenshots and instructions.\n\nForks / Pull Requests welcome!﻿\n翻译\n\nMaurice Cruz2013年4月21日+1\n2\n1\n \n \n+Simon Owen just wanted to thank you for your base template.  Made a spin off from yours!\n\nhttps://github.com/mauricecruz/chrome-devtools-zerodarkmatrix-theme﻿\n翻译\n\nSimon Owen2013年4月21日\n\n\n \n \nNo worries, looking good!﻿\n翻译\n\nEdgar J. Muentes2013年5月11日\n\n\n \n \nI did as instructed and dropped the custom CSS file at the designated location, but my dev tools look the same! what could I be doing wrong? I'm on Chrome 26.0.1410.64 m﻿\n翻译\n\nEdgar J. Muentes2013年5月11日\n\n\n \n \nFigured it out... I have multiple users. default was the wrong user folder.﻿\n翻译\n\nJared Laser2013年5月16日\n\n\n \n \nHave been loving this! In trying to standardize between my ST2 Solarized theme colors and my devtools theme, I'm finding that lots of objects (for lack of a better word) are under the umbrella of the general \"webkit-line-content\" class. In my ST2 theme, I can individually style scoped \"this\" or an \"=\" whereas in devtools, these objects get the .webkit-line-content and .webkit-javascript-keyword classes, respectively. I don't really expect devtools to turn into a full-on IDE/text-editor but just throwing my $0.02 out there :)﻿\n翻译\n\nJoe Lee2013年5月23日\n\n\n \n \nIn my sources panel, I want to have the call stack, break points, dom break points etc to in a vertical panel next to the main source code panel. How do I go about doing this and/or where's the best forum to ask these type questions?﻿\n翻译\n\nOscar Villarreal2013年5月23日\n\n\n \n \nIs there anyway to uninstall it? I'm seeing a lot of weird bugs now with the chrome dev tools﻿\n翻译\n\nMaurice Cruz2013年5月24日\n\n\n \n \n+Joe Lee uncheck Settings -> Appearance -> split panels vertically when docked to right\n\n+Oscar Villarreal delete the Custom.css file in the User Stylesheets directory﻿\n翻译\n\nLucio M. Tato2013年5月26日\n\n\n \n \nworking dark background\nhttps://github.com/luciotato/pitch-black﻿\n翻译\n\nLattapon Yodsuwan2013年6月6日\n\n\n \n \nMany thanks to this awesome. This really help me to killed my free times :)﻿\n翻译\n\nMaurice Cruz2013年6月23日\n\n\n \n \nJust pushed a handful of updates to make my theme easily customizeable to your liking.  Fork away! http://devthemez.com/themes/zero-dark-matrix﻿\n翻译\n\nGabriel Aszalos2013年7月1日\n\n\n \n \n+Angus Neil AWESOME! Thank you!﻿\n翻译\n\nAlina Basova2013年7月2日\n\n\n \n \nGot inspired by your post today and customised my own theme :) thanks﻿\n翻译\n\nMark Anthony Degamo2013年7月6日\n\n\n \n \nHaha...finally got mine working...this is awesome...﻿\n翻译\n\nGabriel Aszalos2013年7月19日\n\n\n \n \nIs it possible to change the font? I'm having a hard time managing to do that. I'd love to have the FireBug font in Chrome!﻿\n翻译\n\nDave Ackerman2013年7月22日\n\n\n \n \n+Gabriel Aszalos you can just do #-webkit-web-inspector * { font-family: \"whatever\" } if you want to change everything globally. ﻿\n翻译\n\nMartin Genev2013年8月3日\n\n\n \n \ni wish i could find slush and poppies for chrome dev tools :(﻿\n翻译\n\ncarlos gabriel2013年10月16日\n\n\n \n \nhi all, where can i find the whole id's and classes to create my own skin?﻿\n翻译\n\nDave Hall2013年10月20日\n\n\n \n \nThis is not working for me in Chrome Canary. Changes in Custom.css are not being applied. Version 32.0.1675.3 canary﻿\n翻译\n\nLucio M. Tato2013年10月23日\n\n\n \n \nthey've changed the editor, now is \"CodeMirror\", and the css classes are\nCodeMirror-xxx or cm-xxx\nlike: .cm-css-variable {\ncolor: #AADD80 !important\n}\n.cm-css-variable-2 {\n    color: greenyellow !important\n}\n\n.CodeMirror-nonmatchingbracket{\n    color:red !important;\n}\n\ncheck https://github.com/luciotato/pitch-black﻿\n翻译\n\nDave Hall2013年10月23日+1\n2\n1\n \n \nThanks. Though, this is open. https://code.google.com/p/chromium/issues/detail?id=309401\nAlso, seems like that class names changed for the body tag as well.\n\nUpdated my repo as well for Canary Mac users\nhttps://github.com/d-g-h/solarized-dark-skin-chrome-devtools﻿\n翻译\n\nMartin Oru2013年11月1日\n\n\n \n \nI cant seem to find the directory on my mac after updating to OSX Mavericks. ~/Library/Application\ Support/Google/Chrome/Default/User\ StyleSheets/ doesn't exist﻿\n翻译\n\nDave Hall2013年11月1日\n\n\n \n \nTry...~/Library/Application\ Support/Google/Chrome/Profile\ 1/User\ StyleSheets﻿\n\nCarlo Panzi2013年11月14日\n\n\n \n \nThanks! Made my own here: https://github.com/kajyr/chrome-devtools-nightdrops-theme﻿\n翻译\n\nIgnacio Chavez2014年1月5日\n\n\n \n \n+Dave Hall Thx!﻿\n\nManuel Rodriguez2014年1月28日\n\n\n \n \nHi, after install version 32, I can't see my old skim, but is yes in css file. Anyone see the same?﻿\n翻译\n\nPatrick Jankun2014年2月3日+1\n2\n1\n \n \nI think this feature has been removed in latest Chrome Canary, same for Chromium :/﻿\n翻译\n\nDave Hall2014年2月6日\n\n\n \n \nYou can add it back via developer extensions, like so, https://github.com/d-g-h/solarized-dark-skin-chrome-devtools. It us keeps out of the directories, but it kills the workflow (reloading extensions)\n+Patrick Jankun﻿\n翻译\n\nMarco Santana2014年2月26日\n\n\n \n \n+Addy Osmani Hi there +Addy Osmani, this looks pretty simple but... I cannot make it work at my Mac OS X 10.6.8, Chrome 33.0.1750.117. I have tried just about everything and the changes at custom.css won't reflect, keeping me with this ever blinding all white screen... Thanks in advance. ﻿\n翻译\n\n白丞祐2014年4月12日\n\n\n \n \nAfter version 32, this feature has been removed. I change my theme through plug-in by Brogrammer.\nhttp://seo-michael.co.uk/brogrammer-theme-for-sublime-chrome-dev-tools/﻿\n翻译\n\nNathaniel Lee2014年7月7日+3\n4\n3\n \n \nCustom.css has been deprecated after version 32.  Try this repo to customize your own DevTool theme or just download themes from Chrome Store (still need to enable the Chrome's experimental feature)\nhttps://github.com/mauricecruz/zero-base-themes﻿\n翻译\n\nJoseph Orbegoso Pea2014年10月27日\n\n\n \n \nHey +Addy Osmani I am trying to set a dev tools theme, but when I paste styles into Custom.css in OS X, then inspect element on any page, nothing happens. All is the same. Any tips? By the way, I'm using es6-module-loader in combination with Guy's jspm. Super awesome.﻿\n翻译\n\n白丞祐2014年10月27日\n\n\n \n \n+Joseph Orbegoso Pea After Chrome version 32, Custom.css is deprecated. You can follow steps in the Readme. Then, you will get your theme on. :)\nhttps://github.com/xero/greybeard-devtools﻿\n翻译\n\nJoseph Orbegoso Pea2014年10月30日+1\n2\n1\n \n \n+白丞祐 Awesome, it worked! Thanks a ton! Mmmmmmm. So nice.﻿\n翻译\n";
            var font = new text.FontDescription("'Microsoft Yahei'");
            var format = new TextFormat();
            format.fontDescription = font;
            format.fontSize = 30;
            format.verticalAlign = VerticalAlign.BOTTOM;
            format.float = TextFloat.LEFT;
            var formatn = format.clone();
            formatn.float = TextFloat.RIGHT;

            var textElement = new text.TextElement("Ind".replace(/\w/ig,(v)=>v+" "), format);
            var ge = new text.GraphicElement(bitmap, 150, 150, format);
            var texte = new text.TextElement("Ind hi where are you ?ent30pxtextIndent30p".replace(/\w/ig,(v) => v + " "), format);
            var texte1 = new text.TextElement("ent30pxtextIndent30pxtextIndent30pxtextIndent30pxtext\nSecondPIndent30pxtxtIndent30pxtextIndent30pxtextIndent30pxtext".replace(/\w/ig,(v) => v + " "), format);
            //var gre = new text.GroupElement([textElement, ge, texte, new text.GraphicElement(bitmap2, 150, 150, formatn), texte1]);
            var gre = new text.GroupElement(contentElements);
            var tb = new text.TextBlock(gre);

            var lines = tb.createAllTextLines(this.stage.stageWidth,format);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                this.addChild(line);
            }

            //var textField = new TextField(str, format);
            //window["t"] = textField;
            //textField.multiline = true;
            //textField.width = 1000;
            //textField.y = 100;
            //textField.height = 800;
            //textField.wordWrap = true;
            ////this.addChild(textField);

            //format = format.clone();
            //format.indent = 30;
            //format.blockIndent = 60;
            //var text2 = new TextField("Ind ent 30px text Ind ent 30px text Ind ent 30px text Ind ent 30px t e x t I n d e n t 30px text Ind ent 30px text\n Second P Ind ent 30px textI ndent 30px text Ind ent 30px text Ind ent 30px text",format);
            //text2.multiline = true;
            //text2.wordWrap = true;
            //text2.width = 500;
            //text2.y = 200;
            //this.addChild(text2);
        }

        
        colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF, 0xFFFF00, 0xFF00FF];
        getRandomColor() {
            var random = Math.random() * this.colors.length;
            random = Math.floor(random);
            return this.colors[random];
        }
    }
}





function convertImgToBase64(url, callback, outputFormat) {
    var canvas = <HTMLCanvasElement>document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    //img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        console.log(dataURL);
        // Clean up
        canvas = null;
    };
    img.src = url;
}

convertImgToBase64("http://localhost:8080/image/px.png",null,null);