import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Thumbnail from './Thumbnail'

export class FeaturedProducts extends React.Component {
  render() {
    return (
      <Wrapper className="allProducts">
        {this.props.allProducts.splice(0, 4).map(product => {
          return <Thumbnail product={product} key={product.id} />
        })}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.products
})

export default connect(mapStateToProps)(FeaturedProducts)

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
`
