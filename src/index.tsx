import * as React from 'react';
import { render } from 'react-dom'
import { AttachmentPanel } from './AttachmentPanel';
import { isEmpty, last } from 'lodash-es';

const attachlists = document.querySelectorAll('.attachlist');

Array.from(attachlists).forEach(attachListNode => {
  const fieldset = attachListNode.parentNode as HTMLFieldSetElement;
  const messageNode = fieldset?.parentNode as HTMLDivElement;
  const liNodes = fieldset.querySelectorAll('li');
  const originalData = Array.from(liNodes)
    .map(liNode => {
      const aid = Number(liNode.getAttribute('aid'));
      const filename = liNode.querySelector('a')?.innerText.trim();
      const ext = (last(filename.split('.')) || '').toLowerCase();
      const [, filesize, downloadTimes] = /大小：(.*?)，下载次数：(.*?)\)/gi
        .exec(liNode.querySelector('span')?.innerText.trim());
      return { aid, filename, filesize, downloadTimes: Number(downloadTimes), ext };
    })
    .filter(a => a.ext === 'ra3replay');
  if (originalData.length === liNodes.length) { // 说明附件全是录像，所有附件统统删光
    fieldset.remove();
    Array.from(messageNode.childNodes).find(node => node.nodeType === 8)?.remove()
    messageNode?.querySelector('style')?.remove();
    messageNode?.querySelector('script')?.remove();
  } else { // 只删除 ra3replay 的录像
    Array.from(liNodes).forEach(liNode => {
      const filename = liNode.querySelector('a')?.innerText.trim();
      const ext = (last(filename.split('.')) || '').toLowerCase();
      if (ext === 'ra3replay') liNode.remove();
    });
  }
  if (!isEmpty(originalData)) {
    const el = document.createElement('div');
    messageNode.appendChild(el)
    render(<AttachmentPanel attachments={originalData} />, el);
  }
});
