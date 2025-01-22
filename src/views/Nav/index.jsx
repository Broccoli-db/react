import React from 'react'
import sty from './index.module.less'
import { Button } from 'antd'
export default function Nav() {
    return (
        <div className={`${sty.nav} ${sty.box}`}>
            我是导航组件
            <div className='num'>2025</div>
            <Button type="primary">Primary Button</Button>
        </div>
    )
}
