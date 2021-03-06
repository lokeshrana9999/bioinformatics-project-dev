import React from 'react';
import PropTypes from 'prop-types';

import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Carousel as AntCarousel, Row, Col } from 'antd';
import { getChildrenToRender } from './utils';

const Feature80DataSource = {
  wrapper: { className: 'home-page-wrapper feature8-wrapper' },
  page: { className: 'home-page feature8' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'feature8-title-wrapper',
    children: [
      { name: 'title', className: 'feature8-title-h1', children: '使用流程' },
      {
        name: 'content',
        className: 'feature8-title-content',
        children: '流程简单清晰，快速响应需求'
      }
    ]
  },
  childWrapper: {
    className: 'feature8-button-wrapper',
    children: [
      {
        name: 'button',
        className: 'feature8-button',
        children: { href: '#', children: '立即体验' }
      }
    ]
  },
  Carousel: {
    dots: false,
    className: 'feature8-carousel',
    wrapper: { className: 'feature8-block-wrapper' },
    children: {
      className: 'feature8-block',
      titleWrapper: {
        className: 'feature8-carousel-title-wrapper',
        title: { className: 'feature8-carousel-title' }
      },
      children: [
        {
          name: 'block0',
          className: 'feature8-block-row',
          gutter: 120,
          title: {
            className: 'feature8-carousel-title-block',
            children: '平台自主训练流程'
          },
          children: [
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child0',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child1',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child2',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child3',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            }
          ]
        },
        {
          name: 'block1',
          className: 'feature8-block-row',
          gutter: 120,
          title: {
            children: '平台自主训练流程',
            className: 'feature8-carousel-title-block'
          },
          children: [
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child0',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child1',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child2',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child3',
              arrow: {
                className: 'feature8-block-arrow',
                children: 'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg'
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children: 'https://gw.alipayobjects.com/zos/basement_prod/d8933673-1463-438a-ac43-1a8f193ebf34.svg'
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: '需求沟通'
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: '沟通业务需求，对接人：诚凡、芸彩沟通业务需求，对接人：诚凡、芸彩'
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }
};

class Feature8 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      current: 0
    };
  }

  onTitleClick = (_, i) => {
    const carouselRef = this.carouselRef.current.childRefs.carousel;
    carouselRef.goTo(i);
  };

  onBeforeChange = (_, newIndex) => {
    this.setState({
      current: newIndex
    });
  };

  getChildrenToRender = dataSource => {
    const { current } = this.state;
    const { Carousel, childWrapper: buttonWrapper } = dataSource;
    const { children: carouselChild, wrapper, ...carouselProps } = Carousel;
    const { titleWrapper, children: childWrapper, ...childrenProps } = carouselChild;

    const { barWrapper, title: titleChild, ...titleWrapperProps } = titleWrapper;
    const titleToRender = [];

    const childrenToRender = childWrapper.map((item, ii) => {
      const { title, children: childRow, ...rowProps } = item;
      if (childWrapper.length > 1) {
        titleToRender.push(
          <div
            {...title}
            key={ii.toString()}
            onClick={e => {
              this.onTitleClick(e, ii);
            }}
            className={ii === current ? `${title.className || ''} active` : title.className}
          >
            {title.children}
          </div>
        );
      }
      const childrenItem = childRow.map(($item, i) => {
        const { children: colChild, arrow, ...colProps } = $item;
        const { ...childProps } = colChild;
        return (
          <Col {...colProps} key={i.toString()}>
            <div {...childProps}>{colChild.children.map(getChildrenToRender)}</div>
            {arrow && (
              <div {...arrow}>
                <img src={arrow.children} alt="img" />
              </div>
            )}
          </Col>
        );
      });

      return (
        <div key={ii.toString()}>
          <QueueAnim component={Row} type="bottom" componentProps={{ type: 'flex' }} {...rowProps}>
            {childrenItem}
          </QueueAnim>
        </div>
      );
    });

    return (
      <QueueAnim key="queue" type="bottom" ref={this.carouselRef} {...childrenProps}>
        {childWrapper.length > 1 && (
          <div {...titleWrapperProps} key="title">
            <div {...titleChild}>{titleToRender}</div>
          </div>
        )}
        <AntCarousel key="carousel" {...carouselProps} infinite={false} beforeChange={this.onBeforeChange}>
          {childrenToRender}
        </AntCarousel>
        <div key="button" {...buttonWrapper}>
          {buttonWrapper.children.map(getChildrenToRender)}
        </div>
      </QueueAnim>
    );
  };

  render() {
    const { isMobile, ...props } = this.props;
    const dataSource = Feature80DataSource;
    const { titleWrapper } = dataSource;
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
          <OverPack {...dataSource.OverPack}>{this.getChildrenToRender(dataSource)}</OverPack>
        </div>
      </div>
    );
  }
}

Feature8.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Feature8;
