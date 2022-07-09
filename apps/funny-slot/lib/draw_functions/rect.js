/*
Created by Nikola Lukic zlatnaspirala@gmail.com
Copyright (c) 2016 by Nikola Lukic , All Rights Reserved. 


Quick Summary
A highly permissive license nearly identical to the MIT license but with some added trademark restrictions.


Can
 Commercial Use 
Describes the ability to use the software for commercial purposes.
 Modify 
Describes the ability to modify the software and create derivatives.
 Distribute 
Describes the ability to distribute original or modified (derivative) works.
 Sublicense 
Describes the ability for you to grant/extend a license to the software.
 Private Use 
Describes the ability to use/modify software freely without distributing it.

Cannot
 Hold Liable 
Describes the warranty and if the software/license owner can be charged for damages.
 Use Trademark 
Describes the allowance of using contributors' names, trademarks or logos.

Must
 Include Copyright 
Describes whether the original copyright must be retained.
 Include License 
Including the full text of license in modified software.


*//***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
function RECT(u,t,s,q,r){this.TEXT_ANGLE=0;this.TEXT_COLOR=r;this.TEXT_ALIGN="\x63\x65\x6E\x74\x65\x72";this.TEXT=u;this.EDIT=true;this.BACKGROUND_OPACITY=0.5;this.TEXT_OPACITY=1;this.textBaseline="\x6D\x69\x64\x64\x6C\x65";this.POSITION=t.POSITION;this.DIMENSION=t.DIMENSION;this.x=function(){return POSITION.X()};this.y=function(){return POSITION.Y()};this.width=function(){return this.DIMENSION.WIDHT()};this.height=function(){return this.DIMENSION.HEIGHT()};this.radius=parseFloat(s);this.color=q;this.border_color="\x72\x67\x62\x61\x28\x31\x32\x31\x2C\x31\x32\x2C\x32\x32\x32\x2C\x30\x2E\x37\x29";this.border_on_focus_color="\x62\x6C\x75\x65";this.border_on_focus_width_line=5;this.font="\x34\x30\x70\x78\x20\x41\x72\x69\x61\x6C";this.DRAW=function(v){v.save();v.globalAlpha=this.BACKGROUND_OPACITY;roundedRect(v,"",this.POSITION.X(),this.POSITION.Y(),this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT(),this.radius,this.color);v.textBaseline=this.textBaseline;if(t.FOCUS==true){v.lineWidth=this.border_on_focus_width_line;v.fillStyle=this.border_on_focus_color;roundedRect(v,"",this.POSITION.X(),this.POSITION.Y(),this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT(),this.radius,this.color,"\x73\x74\x72\x6F\x6B\x65",this.border_color);};v.textAlign=this.TEXT_ALIGN;v.font=this.font;v.fillStyle=this.TEXT_COLOR;v.globalAlpha=this.TEXT_OPACITY;drawRotatedText(v,this.TEXT,this.POSITION.X(),this.POSITION.Y(),this.TEXT_ANGLE,this.DIMENSION.WIDTH(),this.DIMENSION.HEIGHT());v.restore();};}