
/**
Copyright 2016, zlatnaspirala@gmail.com
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of zlatnaspirala@gmail.com nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*//***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
function PROGRAM(n,l){var m=this;this.DRAW_INTERVAL=APPLICATION.PROGRAM.RENDER_SPEED;this.UPDATE_INTERVAL=15;this.BASELINE="\x6D\x69\x64\x64\x6C\x65";this.GLOBAL_TRANSLATE=0;this.DO_GLOBAL_TRANSLATE=false;m.TRANSLATE=function(o){m.GLOBAL_TRANSLATE=o;m.DO_GLOBAL_TRANSLATE=true;};this.GAME_MAP=function(){var p=this;this.TOTAL_LEFT=2;this.TOTAL_RIGHT=4;this.TOTAL_UP=6;this.TOTAL_DOWN=6;this.LEFT=function(){return p.TOTAL_LEFT*-VIEW.W()};this.WIDTH=function(){return p.TOTAL_RIGHT*VIEW.W()};this.UP=function(){return p.TOTAL_UP*-VIEW.H()};this.HEIGHT=function(){return p.TOTAL_DOWN*VIEW.W()};};m.MAP= new m.GAME_MAP();this.AUTO_UPDATE= new Array();this.ENGINE= new ENGINE(l);n.textAlign="\x73\x74\x61\x72\x74";n.textBaseline=this.BASELINE;this.DRAW=function(){n.clearRect(m.MAP.LEFT(),m.MAP.UP(),m.MAP.WIDTH(),m.MAP.HEIGHT());if(m.DO_GLOBAL_TRANSLATE==true){m.DO_GLOBAL_TRANSLATE=false;n.translate(m.GLOBAL_TRANSLATE,0);};m.ENGINE.DRAW_MODULES(n);setTimeout(function(){m.UPDATE()},this.UPDATE_INTERVAL);};this.UPDATE=function(){m.ENGINE.UPDATE_MODULES();for(var o=0;o<this.AUTO_UPDATE;o++){ROOT.AUTO_UPDATE[o].UPDATE()};setTimeout(function(){m.DRAW()},this.DRAW_INTERVAL);};}