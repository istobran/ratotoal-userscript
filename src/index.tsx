import * as React from 'react';
import { render } from 'react-dom'
import { AttachmentPanel } from './AttachmentPanel';

const attachlists = document.querySelectorAll('.attachlist');

Array.from(attachlists).forEach(attachListNode => {
  const fieldset = attachListNode.parentNode as HTMLFieldSetElement;
  const messageNode = fieldset?.parentNode as HTMLDivElement;
  messageNode?.querySelector('script')?.remove();
  Array.from(messageNode.childNodes).find(node => node.nodeType === 8)?.remove()
  messageNode?.querySelector('style')?.remove();
  const liNodes = fieldset.querySelectorAll('li');
  const originalData = Array.from(liNodes).map(liNode => {
    const aid = Number(liNode.getAttribute('aid'));
    const filename = liNode.querySelector('a')?.innerText.trim();
    const [, filesize, downloadTimes] = /大小：(.*?)，下载次数：(.*?)\)/gi.exec('(大小：237.26K，下载次数：168)');
    return { aid, filename, filesize, downloadTimes: Number(downloadTimes) };
  });
  fieldset.remove();
  render(<AttachmentPanel attachments={originalData} /> as any, messageNode);
});
