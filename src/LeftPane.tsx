import { Border } from './Background';
import * as React from 'react';
import styled from '@emotion/styled';
import { ShadowText } from './ShadowText';
import { Button } from './Button';

const LeftInfoContainer = styled.div`
  background-color: #000000;
  background-image: linear-gradient(to top, #6f0d10, #000000);
  padding: 34px 16px 14px;
  .img-content {
    height: 240px!important;
    width: 240px;
    border: none;
    margin: 4px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
  }
  .wrapper {
    background: #000000;
  }
`;
type LeftPaneProps = {
  mapName: string;
  imageUrl: string;
  downloadUrl: string;
  loading?: boolean;
  failed?: string;
}
const MapName = styled.div`
  color: #f4b162;
  padding: 2px 0 10px;
  text-align: center;
  background: #000000;
  font-size: 14px;
  font-weight: bolder;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export function LeftPane(props: LeftPaneProps) {
  // TODO：处理地图预览图
  // TODO：评分
  return (
    <Border color="#bc0d00" width="2px">
      <LeftInfoContainer>
        <Border color="#f4b162" width="2px" className="wrapper">
          {props.imageUrl
            ? <img
              className="img-content"
              src={props.imageUrl}
              alt={props.mapName} />
            : <div className="img-content">
              {props.loading && '正在加载...'}
              {props.failed && '无地图信息'}
              {!props.loading && !props.failed && '暂无地图预览图'}
            </div>}
          {props.mapName && <MapName>{props.mapName}</MapName>}
        </Border>
        <ActionContainer>
          <Button onClick={() => {
            window.open(props.downloadUrl, '_blank');
          }}><ShadowText>下载</ShadowText></Button>
        </ActionContainer>
      </LeftInfoContainer>
    </Border>
  )
}
