# 🧪 QUICK TESTING GUIDE

## How to Test the Complete E-Commerce Flow

---

## 🎯 5-Minute Quick Test

### 1. Test Homepage Add to Cart (1 minute)

**Steps:**
1. Open: https://3000-iiy5dmdkef8bwxqrgjvk8-b237eb32.sandbox.novita.ai/
2. Scroll to "Featured Products" section
3. Click any "In den Warenkorb" button
4. **Expected**: 
   - Green notification appears: "✓ Produkt wurde zum Warenkorb hinzugefügt!"
   - Cart counter in header updates (shows "1")
   - Notification disappears after 3 seconds

### 2. Test Products Page (1 minute)

**Steps:**
1. Click "Produkte" in navigation or go to `/produkte`
2. Browse product cards
3. Click "In den Warenkorb" on 2-3 different products
4. **Expected**:
   - Each click shows success notification
   - Cart counter increases (shows "2", "3", "4"...)
   - All notifications appear and dismiss automatically

### 3. Test Product Detail Page (1 minute)

**Steps:**
1. Click any product card to view details
2. Use the quantity selector (+/- buttons)
3. Set quantity to 2 or 3
4. Click "In den Warenkorb"
5. **Expected**:
   - Success notification appears
   - Cart counter increases by the selected quantity
   - Can see product image, price, description, SKU

### 4. Test Cart Page (1 minute)

**Steps:**
1. Click cart icon in header or go to `/warenkorb`
2. **Expected to See**:
   - All products you added
   - Product images displayed
   - Product names and SKUs
   - Correct prices (including discounts)
   - Quantity controls (+/-)
   - Remove buttons
   - Order summary:
     - Subtotal
     - MwSt. (19%)
     - Total
   - "Zur Kasse gehen" button (enabled)

**Try These:**
- Click "+" to increase quantity → Subtotal updates
- Click "-" to decrease quantity → Subtotal updates
- Type "SAVE10" in coupon field, click OK → 10% discount applied
- Click "Entfernen" on an item → Item removed from cart

### 5. Test Checkout Flow (1 minute)

**Steps:**
1. Click "Zur Kasse gehen" button
2. **Step 1 - Customer Info**:
   - Enter email: test@example.com
   - Enter first name: Max
   - Enter last name: Mustermann
   - Click "Weiter"
3. **Step 2 - Address**:
   - Enter street: Hauptstraße
   - Enter house: 123
   - Enter postal code: 10115
   - Enter city: Berlin
   - Select country: Deutschland
   - Click "Weiter"
4. **Step 3 - Payment**:
   - See order summary
   - Select payment method (Stripe or PayPal)
   - Check terms acceptance box
   - See "Zahlungspflichtig bestellen" button

**Expected**:
- Progress indicator shows current step (1→2→3)
- Can go back with "Zurück" button
- Form validation works (try empty fields)
- Order summary sidebar shows totals
- All data is preserved when going back/forward

---

## 🔍 Detailed Feature Testing

### Cart Manager Features

**Test localStorage Persistence:**
1. Add products to cart
2. Close browser tab
3. Reopen homepage
4. Click cart icon
5. **Expected**: Cart still has your items

**Test Quantity Controls:**
1. Go to cart page
2. Click "+" button → Quantity increases, price recalculates
3. Click "-" button → Quantity decreases, price recalculates
4. Try to go below 1 → Shows confirmation dialog
5. **Expected**: All calculations correct

**Test Coupon Codes:**
1. Go to cart page
2. Type "SAVE10" → Click OK
3. **Expected**: 10% discount applied
4. Type "SAVE20" → Click OK  
5. **Expected**: 20% discount applied (replaces previous)
6. Try "INVALID" → Shows error message

**Quick Coupon Buttons:**
1. Click "SAVE10 (-10%)" button
2. **Expected**: Coupon applied immediately
3. Click "SAVE20 (-20%)" button
4. **Expected**: Replaces with 20% discount
5. Click "WELCOME (-15%)" button
6. **Expected**: Replaces with 15% discount

---

## 🎨 Visual Checks

### Product Cards (Products Page)
- ✅ Product image loads (or fallback icon)
- ✅ Product name displayed
- ✅ Price in EUR (€19.99)
- ✅ Discount shown if applicable
- ✅ Discount percentage badge
- ✅ Rating stars
- ✅ "In den Warenkorb" button visible
- ✅ Hover effects work

### Cart Items
- ✅ Product thumbnail image
- ✅ Full product name
- ✅ SKU code
- ✅ Unit price
- ✅ Original price (strikethrough) if discounted
- ✅ Discount badge
- ✅ Quantity controls (+/- buttons)
- ✅ Remove button
- ✅ Item subtotal

### Checkout Form
- ✅ Step indicator (1, 2, 3)
- ✅ Current step highlighted
- ✅ Form fields clearly labeled
- ✅ Required field indicators
- ✅ Validation messages
- ✅ Payment method icons
- ✅ Order summary sidebar
- ✅ Trust badges

---

## 🧩 API Endpoint Tests

### Test with cURL:

```bash
# Get all products
curl http://localhost:3000/api/products?limit=5

# Get product by ID
curl http://localhost:3000/api/products/id/1

# Get product by slug
curl http://localhost:3000/api/products/windows-11-professional-oem-retail

# Get featured products
curl http://localhost:3000/api/products/featured

# Get bestsellers
curl http://localhost:3000/api/products/bestsellers

# Get new products
curl http://localhost:3000/api/products/new
```

### Run Automated Tests:

```bash
cd /home/user/webapp
./test-flow.sh
```

Expected output: 10/10 tests passing ✓

---

## ✅ Success Checklist

After testing, you should have verified:

- [ ] Homepage loads and displays products
- [ ] Featured products section has Add to Cart buttons
- [ ] Bestsellers section has Add to Cart buttons
- [ ] Products page displays all products with images
- [ ] Every product card has Add to Cart button
- [ ] Product detail page shows full information
- [ ] Product detail page has quantity selector
- [ ] Add to Cart shows success notification
- [ ] Cart counter updates correctly
- [ ] Cart page shows all added products
- [ ] Cart displays product images
- [ ] Cart shows full product names and SKUs
- [ ] Cart shows prices (with discounts)
- [ ] Quantity controls work (+/- buttons)
- [ ] Remove item button works
- [ ] Coupon codes can be applied
- [ ] Discount calculations are correct
- [ ] VAT (19%) is calculated correctly
- [ ] Total amount is correct
- [ ] "Zur Kasse gehen" button is enabled
- [ ] Checkout page loads
- [ ] Step 1 form accepts customer information
- [ ] Step 2 form accepts billing address
- [ ] Step 3 shows order summary
- [ ] Payment method can be selected
- [ ] Form validation works (required fields)
- [ ] Can navigate between steps
- [ ] Progress indicator updates
- [ ] All data is preserved when going back

---

## 🐛 What to Look For (Bugs to Report)

### If you see:
- ❌ "Product not found" errors
- ❌ Cart counter doesn't update
- ❌ Prices calculate incorrectly
- ❌ Images don't load (and no fallback)
- ❌ Buttons don't respond to clicks
- ❌ Form validation doesn't work
- ❌ Quantities reset unexpectedly
- ❌ Cart empties on page reload
- ❌ Checkout steps don't advance
- ❌ CSRF errors on valid operations

### Please report with:
1. What you were doing
2. What you expected
3. What actually happened
4. Browser console errors (F12)

---

## 🎯 Expected Behavior Summary

### Add to Cart Flow:
```
Click Button → API Fetches Product → Product Added to Cart → 
Notification Shows → Counter Updates → Cart Saved to localStorage
```

### Cart Page Flow:
```
Load Page → Read from localStorage → Fetch Product Details → 
Display Items → Calculate Totals → Enable Checkout Button
```

### Checkout Flow:
```
Step 1 (Customer Info) → Validate → Save → 
Step 2 (Address) → Validate → Save → 
Step 3 (Payment) → Review → Submit Order → 
API Creates Order → Assigns License → Shows Confirmation
```

---

## 🚀 Test in Browser

**Desktop:**
1. Chrome: https://3000-iiy5dmdkef8bwxqrgjvk8-b237eb32.sandbox.novita.ai/
2. Firefox: (same URL)
3. Safari: (same URL)

**Mobile:**
1. Open in mobile browser
2. Test responsive design
3. Verify all buttons are clickable
4. Check form inputs work

**Developer Tools:**
1. Press F12
2. Go to Console tab
3. Look for errors (should be none)
4. Go to Application → Local Storage
5. See "cart" data being saved

---

## 📊 Performance Checks

### Page Load Times:
- Homepage: < 2 seconds
- Products page: < 3 seconds
- Product detail: < 2 seconds
- Cart page: < 1 second
- Checkout page: < 2 seconds

### API Response Times:
- Product list: < 500ms
- Product by ID: < 200ms
- Featured products: < 500ms

### Cart Operations:
- Add to cart: Instant (< 100ms)
- Update quantity: Instant
- Apply coupon: Instant
- Remove item: Instant

---

## 🎉 Test Complete!

If all tests pass, you should have:
- ✅ Working Add to Cart buttons everywhere
- ✅ Functional cart page with full product info
- ✅ Complete checkout flow with validation
- ✅ Proper calculations and notifications
- ✅ Responsive design on all devices

**The system is ready for production!** 🚀

---

**Last Updated**: 2026-01-28
**Testing Time**: ~5 minutes for quick test, ~30 minutes for thorough test
**Automated Tests**: `./test-flow.sh` (runs in < 1 second)
