(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(0),a=n.n(c),i=n(7),s=n.n(i),o=(n(31),n(32),n(3)),u=n(6),l=n(10);function b(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],n=0;n<t.length;n++){var r=Object(u.a)(t[n],3),c=r[0],a=r[1],i=r[2];if(e[c]&&e[c]===e[a]&&e[c]===e[i])return e[c]}return null}function j(e){var t=[];return e.map((function(e,n){return!e&&t.push(n),n})),t}function h(e,t){var n=j(e);if("X"===b(e))return{evaluation:-10};if("O"===b(e))return{evaluation:10};if(0===n.length)return{evaluation:0};for(var r,c=[],a=0;a<n.length;a++){var i=n[a],s={};s.id=i;var o=e[i];e[i]=t,s.evaluation="O"===t?h(e,"X").evaluation:h(e,"O").evaluation,e[i]=o,c.push(s)}if("O"===t)for(var u=-1/0,l=0;l<c.length;l++)c[l].evaluation>u&&(u=c[l].evaluation,r=c[l]);else for(var d=1/0,O=0;O<c.length;O++)c[O].evaluation<d&&(d=c[O].evaluation,r=c[O]);return r}var d=function(e){var t=e.value,n=e.onClick,c=t?"squares ".concat(t):"squares";return Object(r.jsx)("button",{onClick:n,className:c,children:t})},O=function(e){var t=e.squares,n=e.onClick;return Object(r.jsx)("div",{className:"board-container",children:Object(r.jsx)("div",{className:"board",children:t.map((function(e,t){return Object(r.jsx)(d,{value:e,onClick:function(){return n(t)}},t)}))})})},p=function(e,t){return{type:"ADD_STEP",payload:{historyPoint:e,squares:t}}},v=function(e){return{type:"ADD_STEP_NUMBER",payload:{stepNumber:e}}},f=n(15),m=n.n(f),x=n(25),y=n(40),N=function(){var e=Object(x.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.post("http://140.82.59.206/gameLogger.php",{action:t});case 3:return n=e.sent,e.abrupt("return",n.data);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),g=[],T=Object(l.b)((function(e){return{history:e.history,stepNumber:e.stepNumber}}))((function(e){var t=Object(c.useState)("X"),n=Object(u.a)(t,2),i=n[0],s=n[1],l=Object(c.useState)(""),d=Object(u.a)(l,2),f=d[0],m=d[1],x=b(e.history[e.stepNumber]),y=0===j(e.history[e.stepNumber]).length,T=function(t){if("X"!==i&&0!==j(e.history[e.stepNumber]).length){var n=e.history.slice(0,e.stepNumber+1),r=n[e.stepNumber];g=Object(o.a)(r);var c="Easy"===t?function(e){var t=j(e);return t.length>0?t[Math.floor(Math.random()*t.length)]:null}(g):h(g,i).id;if(g[c]||x)return;g[c]=i,e.dispatch(p(Object(o.a)(n),g)),e.dispatch(v(n.length)),N("Move Triggered by ".concat(i," index of square ").concat(i)),s("X")}};Object(c.useEffect)((function(){setTimeout((function(){"2 Player"!==f&&T(f)}),300)}),[i]);var E=function(t){if(0===t)e.dispatch({type:"RESTART_GAME"}),e.dispatch(v(t)),s(t%2===0?"X":"O");else{var n=e.history.slice(0,t+1),r=n[t];e.dispatch(v(t)),e.dispatch(p(Object(o.a)(n),r)),s(t%2===0?"X":"O")}};return Object(r.jsx)(a.a.Fragment,{children:Object(r.jsxs)("div",{className:"game-container",children:[Object(r.jsx)("div",{className:"title",children:Object(r.jsx)("h1",{children:"React Tic Tac Toe Game"})}),Object(r.jsx)("div",{className:"container",children:f?Object(r.jsxs)("div",{children:[(x||y)&&Object(r.jsxs)("div",{className:"endgame-container",children:[Object(r.jsx)("div",{className:"endgame",children:y?"Drawn":x&&"Winneerrrr! =>"+x}),Object(r.jsx)("button",{className:"endgame restart",onClick:function(){E(0)},children:"Restart Game"})]}),Object(r.jsxs)("div",{className:x||y?"container opacity":"container",children:[Object(r.jsx)("div",{className:x||y?"player active":"player",children:Object(r.jsx)("h3",{children:y?"DRAWN":x?"Winner => "+x:"Next Player: "+i})}),Object(r.jsx)(O,{squares:e.history[e.stepNumber],onClick:function(t){var n=e.history.slice(0,e.stepNumber+1),r=n[e.stepNumber];(g=Object(o.a)(r))[t]||x||(g[t]=i,e.dispatch(p(Object(o.a)(n),g)),e.dispatch(v(n.length)),N("Move Triggered by ".concat(i," index of square ").concat(i)),s("O"===i?"X":"O"))}}),Object(r.jsx)("div",{className:"info-wrapper",children:Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:"History"}),e.history&&e.history.map((function(e,t){var n=t?"go to move  #".concat(t):"go to start";return 0===t?Object(r.jsx)("li",{children:Object(r.jsx)("button",{onClick:function(){return E(t)},children:n})},t):Object(r.jsx)("li",{children:Object(r.jsx)("button",{onClick:function(){return E(t-1)},children:n})},t)}))]})})]}),Object(r.jsx)("div",{className:x||y?"win":""})]}):Object(r.jsxs)("div",{className:"choose",children:[Object(r.jsx)("span",{children:Object(r.jsx)("button",{className:"button",onClick:function(e){m(e.target.textContent)},children:"Easy"})}),Object(r.jsx)("span",{children:Object(r.jsx)("button",{className:"button",onClick:function(e){m(e.target.textContent)},children:"Unbeatable"})}),Object(r.jsx)("span",{children:Object(r.jsx)("button",{className:"button",onClick:function(e){m(e.target.textContent)},children:"2 Player"})})]})})]})})}));var E=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(T,{})})},k=n(9),C=n(4),A={history:[Array(9).fill(null)],stepNumber:0},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_STEP":return Object(C.a)(Object(C.a)({},e),{},{history:[].concat(Object(o.a)(t.payload.historyPoint),[t.payload.squares])});case"ADD_STEP_NUMBER":return Object(C.a)(Object(C.a)({},e),{},{stepNumber:t.payload.stepNumber});case"GO_TO_STEP":return Object(C.a)(Object(C.a)({},e),{},{history:[].concat(Object(o.a)(A.history),[t.payload.current])});case"RESTART_GAME":return A;default:return e}},P=Object(k.b)(D);s.a.render(Object(r.jsx)(l.a,{store:P,children:Object(r.jsx)(E,{})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.cce80dd6.chunk.js.map