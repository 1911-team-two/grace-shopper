import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Thumbnail from './Thumbnail'

export class FeaturedProducts extends React.Component {
  render() {
    return (
      <Wrapper className="featuredProducts">
        {this.props.allProducts.splice(0, 4).map(product => {
          return <Thumbnail featured product={product} key={product.id} />
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
  overflow-x: scroll;
  margin: 0 -4vw;
  padding-bottom: 2rem;
  padding-left: 4vw;
`
