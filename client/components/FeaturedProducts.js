import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Thumbnail from './Thumbnail'

export class FeaturedProducts extends React.Component {
  render() {
    return (
      <Wrapper className="featuredProducts">
        {this.props.allProducts.slice(0, 4).map(product => {
          return <Thumbnail featured product={product} key={product.id} />
        })}
        <Spacer />
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
  padding: 0 4vw 2rem 4vw;
  box-sizing: border-box;
`
const Spacer = styled.div`
  content: '';
  flex: 0 0 4vw;
`
