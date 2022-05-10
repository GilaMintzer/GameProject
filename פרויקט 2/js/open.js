class Wave {
    constructor(options) {
      // defaults
      const defaults = {
        word: 'Hello',
        id: 'main' 
      }
      
      // combine with options
      let opts = Object.assign({}, defaults, options);
      
      // set vars
      this.id = opts.id;
      this.word = opts.word;
      
      // render word
      this.render();
    }
    
    render() {
      let html = '';
      [...this.word].forEach((letter, index) => {
        html += `<span class="char" style="--char-index:${index};">${letter}</span>`;
      });
      document.getElementById(this.id).innerHTML = `<h1><span class="word">${html}</span></h1>`;
    }
  }
  
  var w = new Wave({
    id: 'main',
    word: 'my games'
  })




