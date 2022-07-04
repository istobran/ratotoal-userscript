import type { Resp, Player } from './Replay';
import { ShadowText } from './ShadowText';
import { dateTime } from 'atomic-kit';
import * as React from 'react';
import styled from '@emotion/styled';
import tick from './assets/tick.png';
import observerRect from './assets/observer_rect.png';
import commentatorRect from './assets/commentator_rect.png';
import alliedRect from './assets/allied_rect.png';
import sovietRect from './assets/soviet_rect.png';
import empireRect from './assets/empire_rect.png';
import randomRect from './assets/random_rect.png';

enum FactionType {
  Observer = 1,
  Commentator = 3,
  Random = 7,
  Empire = 2,
  Allies = 4,
  Soviets = 8,
  Shenzhou = 9,
}

const StyledMatchInfoPane = styled.div`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
  color: #ff7f00;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  .info-item {
    margin: 0 30px 6px 0;
    display: inline-block;
  }
`;

function MatchInfoPane(props: Resp) {
  const version = (props.gameVersion || '').split('.').slice(0, 2).join('.');
  const modInfo = props.modInfo === 'RA3' ? '原版' : props.modInfo;
  const durationText = `${Math.floor(props.duration / 60)} 分 ${props.duration % 60} 秒`;
  // TODO：https://ratotal.org/?thread-1908.htm 录像人可能不对，应该不是 post Commentator
  return (
    <StyledMatchInfoPane>
      <div className="info-item">
        <ShadowText>游戏版本：{version}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>MOD 信息：{modInfo}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>游戏时长：{durationText}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>游戏时间：{dateTime(new Date(props.playAt).getTime())}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>录像人：{(props.players || [])[props.replaySaver]?.name || '未知'}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>参战玩家数：{props.numberOfPlayers}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>初始资金：{props.initialResources}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>游戏速度：{props.gameSpeed}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>游戏开始延时：{props.tapeDelay}</ShadowText>
      </div>
      <div className="info-item">
        <ShadowText>对战类型：{props.vsType}</ShadowText>
      </div>
      <div className="info-item">
        <Checkbox checked={props.allowCommentary}/> 允许评论
      </div>
      <div className="info-item">
        <Checkbox checked={props.enableVoIP}/> 允许语音
      </div>
      <div className="info-item">
        <Checkbox checked={props.broadcastGame}/> 允许广播
      </div>
      <div className="info-item">
        <Checkbox checked={props.randomCrates}/> 允许随机箱子
      </div>
    </StyledMatchInfoPane>
  )
}

const StyledPlayerItem = styled.tr`
  img {
    width: 30px;
  }
`;
const colorMap = {
  [-1]: "transparent", // Random
  0: "#3049ce", // Navy
  1: "#f3d800", // Yellow
  2: "#006b3d", // Green
  3: "#f76800", // Orange
  4: "#9000cd", // Purple
  5: "#ff0000", // Red
  6: "#37d1ff", // Cyan
}
const factionMap = {
  [FactionType.Observer]: observerRect,
  [FactionType.Commentator]: commentatorRect,
  [FactionType.Allies]: alliedRect,
  [FactionType.Soviets]: sovietRect,
  [FactionType.Empire]: empireRect,
  [FactionType.Random]: randomRect,
};
const aiLevelMap = {
  E: '简单',
  M: '中等',
  H: '困难',
  B: '凶残'
};
const aiNameMap = {
  '2 0': '晋三',
  '2 1': '贤治',
  '2 2': '直美',
  '4 0': '温伦',
  '4 1': '吉尔利斯',
  '4 2': '利塞特',
  '8 0': '欧列格',
  '8 1': '莫斯克文',
  '8 2': '夏娜',
};

function PlayerItem(props: Player) {
  const playerName = props.human
    ? <>{props.clan ? `[${props.clan}]` : ''}{props.name}</>
    : <>{aiLevelMap[props.name]} {aiNameMap[`${props.faction} ${props.mode}`] || '随机'}</>
  return (
    <StyledPlayerItem>
      <td className="col-faction"><img src={factionMap[props.faction]} alt={String(props.faction)}/></td>
      <td className="col-name">{playerName}</td>
      <td className="col-color">
        <div style={{ background: colorMap[props.color] }}>{props.color === -1 ? '-' : ''}</div>
      </td>
      <td className="col-team">{props.team || '-'}</td>
      <td className="col-position">{props.position === -1 ? '-' : props.position + 1}</td>
      <td className="col-apm">{props.apm || '-'}</td>
    </StyledPlayerItem>
  )
}

const StyledPlayerInfoPane = styled.div`
  border: 2px solid #bc0d00;
  background: #000000;
  color: #FFFFFF;
  table {
    border-collapse: collapse;
    border: none;
    width: 100%;
    margin-bottom: 0;
  }
  th {
    font-size: 18px;
    margin-bottom: 10px;
  }
  th, td {
    padding: 6px;
    border-top: none;
    vertical-align: inherit;
    border-right: 2px solid #bc0d00;
    &:last-child {
      border-right: none;
    }
  }
  thead th {
    border-bottom: 2px solid #bc0d00;
  }
  .col-faction {
    text-align: center;
    width: 60px;
  }
  .col-color div {
    width: 30px;
    height: 30px;
  }
  tbody tr:nth-child(odd) {
    background: #280506;
  }
`;
const StyledCheckbox = styled.div`
  border: 2px solid #bc0d00;
  width: 24px;
  height: 24px;
  overflow: visible;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: #000000;
  img {
    position: absolute;
    width: 150%;
    height: 150%!important;
    max-width: unset;
    top: -25%;
    left: -25%;
  }
`;

function Checkbox(props: { checked?: boolean }) {
  return (
    <StyledCheckbox>
      {props.checked && <img src={tick} alt="checked"/>}
    </StyledCheckbox>
  )
}

function PlayerInfoPane(props: { players: Player[] }) {
  return (
    <StyledPlayerInfoPane>
      <table>
        <thead>
        <tr>
          <th className="col-faction">阵营</th>
          <th className="col-name">玩家名称</th>
          <th className="col-color">颜色</th>
          <th className="col-team">队伍</th>
          <th className="col-position">位置</th>
          <th className="col-apm">手速</th>
        </tr>
        </thead>
        <tbody>
        {(props.players || [])
          .filter(p => !(p.name === 'post Commentator' && p.apm === null))
          .map((player, index) => <PlayerItem key={index} {...player} />)}
        </tbody>
      </table>
    </StyledPlayerInfoPane>
  )
}

const StyledRightPane = styled.div<{ invalid?: boolean }>`
  flex: 1;
  margin-left: 20px;
  ${props => props.invalid && `
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #ff7f00;
    font-weight: bold;
  `}
`;

export function RightPane(props: Resp) {
  return (
    <StyledRightPane invalid={props.invalid}>
      {props.invalid
        ? <ShadowText>录像解析失败</ShadowText>
        : <>
          <MatchInfoPane {...props} />
          <PlayerInfoPane players={props.players}/>
        </>}
    </StyledRightPane>
  )
}
