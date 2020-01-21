import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Thumbnail from './Thumbnail'

export class AllProducts extends React.Component {
  render() {
    return (
      <Wrapper className="allProducts">
        {this.props.allProducts.map(product => {
          return <Thumbnail product={product} key={product.id} />
        })}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.products
})

export default connect(mapStateToProps)(AllProducts)

const Wrapper = styled.div`
  /* display: flex;
  overflow-x: auto;
  margin: 0 -4vw 0 0; */
  /* width: 25000px;
  transform: translate3d(-3156px, 0px, 0px); */
`
