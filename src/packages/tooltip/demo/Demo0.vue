<template>
  <div>
    <e-space>
      <ETooltip content="这是提示内容这是提示内容">
        上左
      </ETooltip>
      <ETooltip
        content="这是提示内容这是提示内容，direction＝'top'"
        direction="top"
      >
        上边
      </ETooltip>
      <ETooltip
        content="这是提示内容direction='top-right'"
        direction="top-right"
      >
        上右
      </ETooltip>
    </e-space>
    <br />
    <e-space>
      <ETooltip direction="left" content="这是提示内容direction=left">
        左边
      </ETooltip>
      <span />
      <ETooltip direction="right" content="这是提示内容direction=right">
        右边
      </ETooltip>
    </e-space>
    <br />
    <e-space>
      <ETooltip
        direction="bottom-left"
        content="这是提示内容direction=bottom-left"
      >
        下左
      </ETooltip>
      <ETooltip direction="bottom" content="这是提示内容direction=bottom">
        下边
      </ETooltip>
      <ETooltip
        direction="bottom-right"
        content="这是提示内容direction=bottom-right"
      >
        下右
      </ETooltip>
    </e-space>
  </div>
</template>
