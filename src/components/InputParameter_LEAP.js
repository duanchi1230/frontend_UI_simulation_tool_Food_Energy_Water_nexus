import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class InputParameter_LEAP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parameter:this.props.LEAP_parameter
    }
  }

    onChange(value, para, name) {

      this.state.parameter[name][para] = value
        this.setState({
  
        })
    }
  
    render() {
      console.log(this.state.parameter)
      return (
        <div>
          {Object.entries(this.state.parameter).map(([k, v])=>{
            if(this.props.checked_LEAP_parameter.includes(k)){
            return (
              <div>
                {v['name']}
              <Row>  
              <Col span={8}>
                <div className='scenario-input'>Start(Min {v['min']}%)</div>
                <InputNumber
                  defaultValue={v['start']}
                  min={v['min']}
                  max={v['max']}
                  step={0.1}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  onChange={(value, para = 'start', name = k) => this.onChange(value, para, name)}
                />
              </Col>
              <Col span={8}>
                <div className='scenario-input'>Max(End {v['max']}%)</div>
                <InputNumber
                  defaultValue={v['end']}
                  min={v['min']}
                  max={v['max']}
                  step={0.1}
                  value={v['end']}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  onChange={(value, para = 'end', name = k) => this.onChange(value, para, name)}
                />
              </Col>
              <Col span={8}>
                <div className='scenario-input'>Step({v['step-min']}%-{v['step-max']}%)</div>
                <InputNumber
                  defaultValue={v['step']}
                  min={v['step-min']}
                  max={20}
                  step={0.1}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  onChange={(value, para = 'step', name = k) => this.onChange(value, para, name)}
                />
              </Col>
            </Row>
            </div>
            )}
          })}
        
        </div>
      );
    }
  }

  export default InputParameter_LEAP