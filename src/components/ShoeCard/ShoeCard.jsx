import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const priceStyles = {
    '--color' : typeof salePrice === 'number' ? `${COLORS.gray[700]}`  : 'inherit',
    '--text-decoration' : typeof salePrice === 'number' ? 'line-through' : 'initial' 
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Flag variant={variant}>{`${variant === 'new-release' ? 'Just Released!' : 'Sale'}`}</Flag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price style={priceStyles}>{formatPrice(price)}</Price>
            {typeof salePrice === 'number' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex-basis: 344px;
  flex-grow: 1;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
`;

const Image = styled.img`
  width: 100%;
`;

const Flag = styled.p`
  display: ${props => props.variant === 'default' ? 'none' : 'initial'};
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  background-color: ${props => props.variant === 'new-release' ? COLORS.secondary : COLORS.primary };
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  border-radius: 2px;
  padding: 10px;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;


const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;


export default ShoeCard;
