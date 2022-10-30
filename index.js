const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, data) {
    this.index = 0;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = '0';
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.timestamp +
      this.data +
      this.previousHash +
      this.nonce
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()]
  }

  createGenesis() {
    return new Block(0, '30-10-2022', 'Genesis block', 0)
  }

  latestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.index = this.latestBlock().index + 1;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  checkValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currenBlock = this.chain[i];
      const previosBlock = this.chain[i - 1];

      if(currenBlock.previousHash !== previosBlock.hash ||
         currenBlock.hash !== currenBlock.calculateHash()) {
        return false;
      }

      return true;
    }
  }

}

function getDate() {
  const date = new Date().toISOString().slice(0, 10);
  return date.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1');
}

let jsChain = new Blockchain();
jsChain.addBlock(new Block(getDate(), {amount: 1}));
jsChain.addBlock(new Block(getDate(), {amount: 2}));


console.log(JSON.stringify(jsChain, null, 4));
console.log('Is blockchain valid? ' + jsChain.checkValid());
