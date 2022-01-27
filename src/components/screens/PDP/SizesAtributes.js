import React, { Component } from 'react';
import ColorBtn from '../../UI/Buttons/ColorBtn';
import SizeButton from '../../UI/Buttons/SizeButton';
import { connect } from 'react-redux';
import { changeAttrubute } from '../../../store/actions';
import { generateKey } from '../../../GenerateKey';
import './SizesAtributes.css';

class SizesAtributes extends Component {
  constructor(props) {
    super(props);
    this.attrHandler = this.attrHandler.bind(this);
  }
  state = { checked: false };
  currentAttributes = this.props.attributes[0];

  attrHandler(id, attr, name) {
    this.props.changeAttrubute(id, attr, name);
  }
  checkIfSelected(attrib, attNanme) {
    const found = this.props.clickedAttributes.find(
      (att) =>
        att.id === this.props.id &&
        att.name === attNanme &&
        attrib.value === att.attribute.value
    );
    if (found) {
      return true;
    }
    return false;
  }
  render() {
    this.checkIfSelected();
    if (
      this.currentAttributes !== undefined &&
      this.props.attributes.length > 0
    ) {
      return (
        <div className="atts-containter">
          <div className="sizes-buttons">
            {this.props.attributes.map((attKind) => {
              if (attKind.name === 'Color') {
                return (
                  <div className="att-cont" key={generateKey(attKind.name)}>
                    <div className="att-name">{attKind.name}</div>
                    <div className="att-list">
                      {attKind.items.map((attr) => {
                        return (
                          <ColorBtn
                            key={generateKey(attr.value)}
                            style={{ backgroundColor: attr.value }}
                            checked={this.checkIfSelected(attr, attKind.name)}
                            onClick={() =>
                              this.attrHandler(
                                this.props.id,
                                attr,
                                attKind.name
                              )
                            }
                          ></ColorBtn>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="att-cont" key={generateKey(attKind.name)}>
                    <div className="att-name">{attKind.name}</div>
                    <div className="att-list">
                      {attKind.items.map((attr) => {
                        return (
                          <SizeButton
                            key={generateKey(attr.value)}
                            onClick={() =>
                              this.attrHandler(
                                this.props.id,
                                attr,
                                attKind.name
                              )
                            }
                            checked={this.checkIfSelected(attr, attKind.name)}
                          >
                            {attr.value}
                          </SizeButton>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    clickedAttributes: state.clickedAttributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute, name) =>
      dispatch(changeAttrubute(id, attribute, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SizesAtributes);
