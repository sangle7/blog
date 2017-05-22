30题目录：[https://javascript30.com/](https://javascript30.com/)

## 03 - CSS Variables

### 最终代码

```javascript
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
    --blur: 10px;
}
img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}
.hl {
  color: var(--base);
}
```

### 知识点

#### CSS变量