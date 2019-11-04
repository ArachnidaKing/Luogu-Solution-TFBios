// ==UserScript==
// @name         TFOiers
// @version      2.17
// @namespace    http://tampermonkey.net/
// @description  Be TF!!!
// @author       ArachnidaKing
// @match        https://www.luogu.org/problemnew/solution/*
// @grant        none
// ==/UserScript==

(function()
{
	'use strict';
	//
	const leftArrow=37;
	const upArrow=38;
	const rightArrow=39;
	const downArrow=40;
	const insertKey=45;
	const deleteKey=46;
	//
	const toHide=leftArrow;
	const toDisplay=rightArrow;
	const middleTime=1000;
	//
	var F2Code=113;
	var inputs=document.getElementsByTagName("textarea");
	var input_num=inputs.length;
	//
	var playPositionId;
	var novelNode;
	var dq_middleTime=middleTime;
	var inStopForTime=0;
	document.onkeydown=function(event)
	{
		let dq_keyCode=event.keyCode;
		//
		if(dq_keyCode==F2Code)
		{
			for(let i=0;i<input_num;++i)
			{
				if(inputs[i].value)
				{
					playPositionId=i;
					++F2Code;
					if(F2Code==116)
					{
						F2Code=-1;
					}
					break;
				}
			}
			//
			find(playPositionId);
		}
		//
		novelNode=document.getElementById("novelText");
		if(dq_keyCode==toHide)
		{
			if(novelNode)
			{
				novelNode.style.visibility="hidden";
			}
		}
		else if(dq_keyCode==toDisplay)
		{
			if(novelNode)
			{
				novelNode.style.visibility="visible";
			}
		}
		//
		if(dq_keyCode==upArrow)
		{
			//暂停功能实现
		}
		else if(dq_keyCode==downArrow)
		{
			//继续功能实现
		}
	};
	////
	function find(p)
	{
		let thisAllParagraphs=document.getElementsByClassName("lg-article am-g")[p+1].getElementsByTagName("p");
		let textNextParagraph_p=(thisAllParagraphs.length>2)?(2):(-1);
		//
		let textNode=document.createElement("p");
		let thisArtical=document.getElementsByClassName("lg-article am-g")[p+1];
		if(textNextParagraph_p<0)
		{
			thisArtical.insertBefore(textNode,thisArtical.lastChild);
		}
		else
		{
			thisArtical.insertBefore(textNode,thisAllParagraphs[textNextParagraph_p]);
		}
		//
		textNode.id="novelText";
		work(textNode);
	}
	//
	function work(textBoard)
	{
		const lengthPerParagraph=100;
		const novelText=inputs[playPositionId].value;
		const novelTextLength=novelText.length;
		//
		let char_p=0;
		//
		let dq_paragraph;
		let f=0;
		var displayNewText=function()
		{
			if(novelTextLength-char_p-1<=lengthPerParagraph)
			{
				f=1;
			}
			dq_paragraph=novelText.substr(char_p,lengthPerParagraph);
			char_p+=lengthPerParagraph;
			textBoard.innerHTML=dq_paragraph;
			//
			if(!f)
			{
				setTimeout(displayNewText,dq_middleTime);
			}
			else
			{
				setTimeout(function(){textBoard.style.display="none";},dq_middleTime);
			}
		}
		//
		displayNewText();
	}
})();
