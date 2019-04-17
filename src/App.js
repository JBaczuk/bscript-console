import React, { Component } from 'react';
import './App.css';
import { Interpreter, Script } from 'bscript-interpreter'
import Assembler from 'bscript-assembler'
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      script: '',
      queue: [],
      stack: [],
      initialized: false
    }
    this.interpreter = null
  }

  delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms) })
  }

  componentDidMount() {
    this.consoleInput.focus()
  }

  handleInputChange = (event) => {
    this.setState({
      script: event.target.value
    })
  }

  handleInputKey = (event) => {
    if (event.key === 'Enter') {
      // TODO: validate each expression separated by space
      // TODO: insert into queue one by one stacked
      this.initExecution()
    }
  }

  putItemsInQueue = async () => {
    let queue = this.state.script.split(' ')
    await this.setState({
      queue
    })
  }

  initExecution = async () => {
    if (this.state.initialized) return
    // TODO: interpret each item in queue
    // Test execution
    await this.putItemsInQueue()
    await this.delay(1000)
    let hex = Assembler.asmToRaw(this.state.script)
    let script = new Script(Buffer.from(hex, 'hex'))
    this.interpreter = new Interpreter(script)
    this.setState({
      initialized: true
    })
  }

  play = async () => {
    console.log('play')
    await this.initExecution()
    let evalResult = this.interpreter.evaluate()
    console.log(evalResult)
    // TODO: animate step by step??
    // TODO: if true, show success
  }

  step = async () => {
    console.log('step')
    await this.initExecution()
    this.interpreter.step()
    let queue = this.state.queue.slice(1)
    console.log('stack', this.interpreter.stack)
    let stack = this.interpreter.stack.map(item => {
      return item.toString('hex')
    })
    this.setState({
      stack,
      queue
    })
  }

  refresh = () => {
    console.log('refresh')
  }

  render() {

    let queueComponents
    if (this.state.queue.length > 0) {
      queueComponents = this.state.queue.map((expression, i) => {
        return (
          <span key={i}>{expression}</span>
        )
      })
    }

    let stackComponents
    if (this.state.stack.length > 0) {
      stackComponents = this.state.stack.map((expression, i) => {
        return (
          <span key={i}>{expression}</span>
        )
      })
    }

    return (
      <div className='App'>

        <header className='App-header'>
          <h1>Bitcoin Script Console</h1>
        </header>

        <div className='main'>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
            <h2>Queue</h2>
            <div className='container' id='queue'>
              {queueComponents}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
            <h2>Stack</h2>
            <div className='container' id='stack'>
              {stackComponents}
            </div>
          </div>
        </div>

        <div className='console' style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 18, marginRight: 18, justifyContent: 'space-between' }}>
            <h2 style={{ cursor: 'pointer' }} onClick={this.play}><i className="fa fa-play" /></h2>
            <h2 style={{ marginLeft: 18, cursor: 'pointer' }} onClick={this.step}><i className="fa fa-step-forward" /></h2>
            <h2 style={{ marginLeft: 18, cursor: 'pointer' }} onClick={this.refresh}><i className="fa fa-refresh" /></h2>
          </div>
          <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
            <input ref={(input) => this.consoleInput = input} type='text' className='consoleInput' style={{ flexGrow: 2, textAlign: 'left' }} value={this.state.script} onChange={this.handleInputChange} onKeyDown={this.handleInputKey} />
          </div>
          <h2 style={{ flexGrow: 1 }}>Console</h2>
        </div>


      </div>
    );
  }
}

export default App;
