'use babel';

import AtomCodeView from './atom-code-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCodeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCodeView = new AtomCodeView(state.atomCodeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCodeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-code:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCodeView.destroy();
  },

  serialize() {
    return {
      atomCodeViewState: this.atomCodeView.serialize()
    };
  },

  toggle() {
    console.log('AtomCode was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
