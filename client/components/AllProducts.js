import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
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

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

export default connect(mapStateToProps)(AllProducts)
