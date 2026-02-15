# Event Listener Memory Leak Prevention

## Problem Statement

**Current State**: 210 addEventListener calls, 0 removeEventListener calls  
**Risk**: Memory leaks in long-running pages, browser slowdown  
**Impact**: High for admin pages and SPAs

## The Memory Leak Issue

```javascript
// ❌ BAD: Memory leak - event listener never removed
document.getElementById('button').addEventListener('click', handleClick);
```

When a page component unmounts or updates, event listeners remain in memory, preventing garbage collection.

## Solution Patterns

### Pattern 1: Vanilla JavaScript (Cleanup Function)

```javascript
// ✅ GOOD: Store reference and clean up
const button = document.getElementById('button');
const handleClick = () => {
  console.log('clicked');
};

button.addEventListener('click', handleClick);

// When component unmounts or page unloads:
button.removeEventListener('click', handleClick);
```

### Pattern 2: React useEffect Pattern

```typescript
// ✅ GOOD: Automatic cleanup with useEffect
useEffect(() => {
  const button = document.getElementById('button');
  const handleClick = () => {
    console.log('clicked');
  };
  
  button?.addEventListener('click', handleClick);
  
  // Cleanup function runs when component unmounts
  return () => {
    button?.removeEventListener('click', handleClick);
  };
}, []);
```

### Pattern 3: AbortController (Modern Approach)

```javascript
// ✅ BEST: Use AbortController for automatic cleanup
const controller = new AbortController();

button.addEventListener('click', handleClick, { 
  signal: controller.signal 
});

// When done, abort all listeners at once
controller.abort();
```

### Pattern 4: Component Lifecycle

```typescript
// ✅ GOOD: Class component lifecycle
class MyComponent {
  private handlers: Map<string, EventListener> = new Map();

  mount() {
    const clickHandler = () => { /* ... */ };
    this.handlers.set('click', clickHandler);
    button.addEventListener('click', clickHandler);
  }

  unmount() {
    // Clean up all event listeners
    this.handlers.forEach((handler, event) => {
      button.removeEventListener(event, handler);
    });
    this.handlers.clear();
  }
}
```

## Audit Results & Priority

### High Priority Pages (Admin - Long-Running)
These pages are likely to be open for extended periods:

1. **admin-analytics.tsx** (1,632 lines, complex)
   - Many chart interactions
   - Date range pickers
   - Export buttons
   
2. **admin-dashboard-advanced.tsx**
   - Real-time updates
   - Multiple data widgets
   
3. **admin-products.tsx**
   - Bulk operations
   - Filter controls

### Medium Priority (User-Facing SPAs)

4. **checkout.tsx**
   - Payment form interactions
   - Validation handlers
   
5. **product-detail-modern.tsx**
   - Image gallery
   - Add to cart buttons

### Low Priority (Static Pages)

6. One-time use pages with short sessions

## Implementation Checklist

### Phase 1: Audit (30 minutes)
- [ ] Identify all 210 addEventListener calls
- [ ] Categorize by page/component
- [ ] Prioritize by usage frequency

### Phase 2: High Priority Fixes (2 hours)
- [ ] Fix admin-analytics.tsx (1-2 hours)
- [ ] Fix admin-dashboard-advanced.tsx (30 min)
- [ ] Fix admin-products.tsx (30 min)

### Phase 3: Medium Priority Fixes (2 hours)
- [ ] Fix checkout.tsx (1 hour)
- [ ] Fix product-detail-modern.tsx (1 hour)

### Phase 4: Automated Detection (1 hour)
- [ ] Create ESLint rule to detect missing cleanup
- [ ] Add to CI/CD pipeline

## Automated Detection Script

```bash
#!/bin/bash
# find_listener_leaks.sh

echo "=== EVENT LISTENER LEAK DETECTOR ==="

for file in $(find src -name "*.tsx" -o -name "*.ts"); do
  ADD_COUNT=$(grep -c "addEventListener" "$file" 2>/dev/null || echo 0)
  REMOVE_COUNT=$(grep -c "removeEventListener" "$file" 2>/dev/null || echo 0)
  
  if [ "$ADD_COUNT" -gt 0 ] && [ "$REMOVE_COUNT" -eq 0 ]; then
    echo "⚠️  $file: $ADD_COUNT listeners, NO cleanup"
  elif [ "$ADD_COUNT" -gt "$REMOVE_COUNT" ]; then
    echo "⚠️  $file: $ADD_COUNT listeners, $REMOVE_COUNT cleanups (mismatch)"
  fi
done
```

## Quick Fix Template

For any page with event listeners, wrap in this pattern:

```typescript
export function PageComponent() {
  useEffect(() => {
    // All event setup code here
    const handlers: Array<{
      element: HTMLElement | null;
      event: string;
      handler: EventListener;
    }> = [];

    // Add listeners
    const addListener = (
      selector: string, 
      event: string, 
      handler: EventListener
    ) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.addEventListener(event, handler);
        handlers.push({ element, event, handler });
      }
    };

    // Your event registrations
    addListener('#button1', 'click', handleButton1);
    addListener('#button2', 'click', handleButton2);
    // ... more listeners ...

    // Cleanup function
    return () => {
      handlers.forEach(({ element, event, handler }) => {
        element?.removeEventListener(event, handler);
      });
    };
  }, []);

  return (/* JSX */);
}
```

## Testing for Memory Leaks

### Chrome DevTools Method

1. Open Chrome DevTools → Memory tab
2. Take heap snapshot
3. Navigate to page with event listeners
4. Navigate away from page
5. Force garbage collection (trash icon)
6. Take another heap snapshot
7. Compare: Detached DOM nodes indicate memory leaks

### Automated Testing

```typescript
// memory-leak.test.ts
describe('Memory Leak Tests', () => {
  it('should clean up event listeners on unmount', () => {
    const addSpy = jest.spyOn(HTMLElement.prototype, 'addEventListener');
    const removeSpy = jest.spyOn(HTMLElement.prototype, 'removeEventListener');
    
    const { unmount } = render(<MyComponent />);
    
    const addCount = addSpy.mock.calls.length;
    
    unmount();
    
    const removeCount = removeSpy.mock.calls.length;
    
    expect(removeCount).toBe(addCount); // Should match
  });
});
```

## Best Practices

1. **Always pair addEventListener with removeEventListener**
2. **Use useEffect cleanup in React components**
3. **Consider AbortController for multiple listeners**
4. **Store handler references (don't use inline functions)**
5. **Test with Chrome DevTools Memory profiler**
6. **Add ESLint rules to catch missing cleanup**

## Resources

- [MDN: EventTarget.removeEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [React: Cleanup Functions](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)
- [Chrome DevTools: Memory](https://developer.chrome.com/docs/devtools/memory-problems/)

## Status

- **Pattern Documented**: ✅
- **Detection Script**: ✅
- **High Priority Fixes**: 📋 TODO
- **Automated Testing**: 📋 TODO

---

**Next Action**: Run `find_listener_leaks.sh` to identify priority files for fixing.
