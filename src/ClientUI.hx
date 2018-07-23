import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M;
import mithril.M.m;
import Client;

using StringTools;

class ClientUI {}


class UIUserData implements Mithril {
    var username:String = '';
    var password:String = '';
    public function new() {}
    public function view() {
        var loginform =  switch State.userData {
            case StateMode.None:
                [
                    m('h1', 'Log in'),
                    m("input[type=input][placeholder='Email']#username", {onkeyup:e->{
                        trace(e.target.value);
                        if (!UserEmail.isValid(e.target.value)) {
                            js.Browser.document.querySelector('#username').classList.add('invalid');
                        } else {
                            js.Browser.document.querySelector('#username').classList.remove('invalid');
                            username = e.target.value;
                        }
                        return null;
                    }}),
                    m("input[type=password][placeholder='Password']#password", {onkeyup:e->{
                        trace(e.target.value);
                        if (!UserPassword.isValid(e.target.value)) {
                            js.Browser.document.querySelector('#password').classList.add('invalid');
                        } else {
                            js.Browser.document.querySelector('#password').classList.remove('invalid');
                            password = e.target.value;
                        }
                        return null;
                    }}),   
                    m('button[type=button]', {onclick:e->{
                        trace(username + ' ' + password);
                        if (!UserEmail.isValid(username)) {
                            Browser.alert('Username $username is invalid');
                        } else if (!UserPassword.isValid(password)) {
                            Browser.alert('Password $password is invalid');
                        } else {
                        trace(username + ' ' + password);
                            State.setUserData(StateMode.Loading);
                            Firebase.auth().signInWithEmailAndPassword(username, password);
                        }
                        return null;

                    }}, 'Login'),
                    
                ];
            case StateMode.Loading:
                [
                    m('h1', 'Loading...'),
                ];
            case StateMode.Data(userData):

                var domainAlternatives = userData.domains.copy();
                domainAlternatives.unshift('- Select domain');

                [
                    m('h1', 'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!'),
                    m('button', {onclick:e->{
                        Firebase.auth().signOut();
                    }}, 'Logout'),
                    m('select', {onchange:e->{
                        trace(e.target.selectedIndex);
                        trace(e.target.value);
                        var value:String = e.target.value;
                        if (!value.startsWith('-')) State.setCurrentDomain(e.target.value);
                    }}, domainAlternatives.map(v->m('option', {value:v }, 'Alt $v'))), 
                    m('div', 'Data: ' + userData),
                ];
        }

        var header = m('header', {style:{backgroundColor:State.siteCurrentDomain.color}}, [
                // m('h1', 'Header'),
                m('form', loginform),
                // loginform,
            ]);

        return header;
    }
}