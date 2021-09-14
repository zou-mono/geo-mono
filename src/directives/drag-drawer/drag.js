export default {
    bind(el, binding, vnode, oldVnode) {
        const minWidth = 400
        const handle_width = 20
        const dragDom = el.querySelector('.el-drawer')
        dragDom.style.overflow = 'visible'

        const resizeElL = document.createElement('div')
            // const img = new Image(24, 38)
            // img.src = require('@/assets/stretch.png')
        dragDom.appendChild(resizeElL)
            // dragDom.appendChild(img)
        resizeElL.style.cursor = 'w-resize'
        resizeElL.style.position = 'absolute'
        resizeElL.style.height = '100%'
        resizeElL.style.width = `${handle_width}px`
        resizeElL.style.right = '0px'
        resizeElL.style.top = '0px'

        // img.style.position = 'absolute'
        // img.style.right = '-12px'
        // img.style.top = '50%'

        resizeElL.onmousedown = (e) => {
            const elW = dragDom.clientWidth
            const EloffsetLeft = el.offsetLeft
            const clientX = e.clientX
            document.onmousemove = function(e) {
                    e.preventDefault();
                    // 左侧鼠标拖拽位置
                    if (clientX > EloffsetLeft && clientX < EloffsetLeft + handle_width) {
                        // 往左拖拽
                        if (clientX > e.clientX) {
                            dragDom.style.width = elW + (clientX - e.clientX) + 'px'
                        }
                        // 往右拖拽
                        if (clientX < e.clientX) {
                            if (dragDom.clientWidth >= minWidth) {
                                dragDom.style.width = elW - (e.clientX - clientX) + 'px'
                            }
                        }
                    }
                    // 右侧鼠标拖拽位置
                    else if (clientX > EloffsetLeft + elW - handle_width && clientX < EloffsetLeft + elW) {
                        // 往左拖拽
                        if (clientX > e.clientX) {
                            if (dragDom.clientWidth >= minWidth) {
                                dragDom.style.width = elW - (clientX - e.clientX) + 'px'
                            }
                        }
                        // 往右拖拽
                        if (clientX < e.clientX) {
                            dragDom.style.width = elW + (e.clientX - clientX) + 'px'
                        }
                    }
                }
                // 拉伸结束
            document.onmouseup = function(e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}