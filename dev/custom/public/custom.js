class AppDrawer extends HTMLElement {}
window.customElements.define('app-drawer', AppDrawer)

window.customElements.whenDefined('app-drawer')
.then(()=>{
    console.log('defined!');
});

