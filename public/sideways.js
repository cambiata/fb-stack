(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.sideways = {})));
}(this, (function (exports) { 'use strict';

const sideways = document.querySelector('.sideways');
const container = document.querySelector('.sideways > .pages');
const pageLefts = document.querySelectorAll('.page-left');
const pageRights = document.querySelectorAll('.page-right');

const pages = document.querySelectorAll('.page');
const numPages = pages.length;

var elements = {
  sideways,
  container,
  pageLefts,
  pageRights,
  pages,
  numPages,
}

const css = document.createElement('style');
css.type = 'text/css';

css.innerHTML = (`
html, body {
  height: 100%;
}

.sideways {
  // height: 100%;
  // width: 100%;
  position: relative;
  overflow: hidden;
}

.sideways > .pages {
  width: ${elements.sideways.offsetWidth * elements.numPages}px;
  height: 100%;
  display: block;
  position: relative;
}

.page {
  width: ${elements.sideways.offsetWidth}px;
  float: left;
  height: 100%;
}

.animated {
  transition: all 200ms ease-out;
}
`);

// exported functions
function load() {
  document.getElementsByTagName('head')[0].appendChild(css);
}

function updateWidth() {
  elements.container.style.width = `${elements.sideways.offsetWidth * elements.numPages}px`;
  for (let page of elements.pages) {
    page.style.width = `${elements.sideways.offsetWidth}px`;
  }
}

function addAnimation() {
  elements.container.classList.add('animated');
}

function removeAnimation() {
  elements.container.classList.remove('animated');
}

var styles = {
  load,
  addAnimation,
  removeAnimation,
  updateWidth,
}

let currentPage = 0;



// exported functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const getCurrentPage = () => currentPage;

function moveToPage(pageNumber) {
  elements.container.style.transform = `translate3d(-${elements.sideways.offsetWidth * pageNumber}px, 0px, 0px)`;
  currentPage = pageNumber;
}

async function moveToPage2(pageNumber) {
  styles.addAnimation();
  moveToPage(pageNumber);  
  await delay(300);
  styles.removeAnimation(); 
}

async function movePageLeft() {
  styles.addAnimation();
  moveToPage(--currentPage);  
  await delay(300);
  styles.removeAnimation();
}

async function movePageRight() {
  styles.addAnimation();
  moveToPage(++currentPage);
  await delay(300);
  styles.removeAnimation();
}

// TODO: functions to move directly to one page bypassing pages inbetween
function movePageleftTo(pageNumber) {

}

function movePageRightTo(pageNumber) {

}

function init(startingPage) {
  document.addEventListener('DOMContentLoaded', () => {    
    // moveToPage(startingPage);
    styles.load();
    styles.updateWidth();
    
    // event listeners
    window.addEventListener('resize', () => {
      styles.updateWidth();
      moveToPage(getCurrentPage()); // center new page size in viewport
    });    
    elements.pageLefts.forEach(e => e.addEventListener('click', () => movePageLeft()));
    elements.pageRights.forEach(e => e.addEventListener('click', () => movePageRight()));
  });
}

exports.init = init;
exports.delay = delay;
exports.moveToPage = moveToPage;
exports.moveToPage2 = moveToPage2;
exports.movePageLeft = movePageLeft;
exports.movePageRight = movePageRight;
exports.movePageleftTo = movePageleftTo;
exports.movePageRightTo = movePageRightTo;
exports.getCurrentPage = getCurrentPage;

Object.defineProperty(exports, '__esModule', { value: true });

})));
