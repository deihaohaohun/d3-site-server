import * as dayjs from 'dayjs';
import { ManipulateType } from 'dayjs';

/**
 *
 * @param prevDate 笔记上次复习时间
 * @param current 笔记进行到第几次复习
 *  day	d	日
    week	w	周
    month	M	月份(0-11)
    year	y	年
    hour	h	小时
    minute	m	分钟
    second	s	秒
    millisecond	ms	毫秒
 */
export function getAbhsDates(prevDate: Date, current: number) {
  let date = dayjs(prevDate);
  const map: [number, ManipulateType][] = [
    [30, 'm'],
    [12, 'h'],
    [1, 'd'],
    [2, 'd'],
    [4, 'd'],
    [7, 'd'],
    [15, 'd'],
    [30, 'd'],
    [90, 'd'],
    [180, 'd'],
  ];
  const [count, unit] = map[current - 1];
  date = date.add(count, unit);

  return date;
}
