<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Your Order - Santa's Certified Letters</title>
    
    <!-- HARDCODED TRACKDESK PIXEL - LEAD -->
    <script>
        (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
    </script>
    <script src="//cdn.trackdesk.com/tracking.js" async></script>
    <script>
        window.addEventListener('load', function() {
            console.log('🎯 LEAD PIXEL FIRING');
            if (window.trackdesk) {
                window.trackdesk("directwebinteractive", "conversion", { "conversionType": "lead" });
                console.log('✅ LEAD PIXEL FIRED');
            }
        });
    </script>
    
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
        .StripeElement { padding: 16px 14px; border: 2px solid #d1d5db; border-radius: 0.375rem; background: white; height: 48px; }
        .StripeElement--focus { border-color: #3b82f6; }
        .StripeElement--invalid { border-color: #dc2626; }
    </style>
</head>
<body>

    <!-- Promo Banner -->
    <div class="bg-red-600 text-white text-center pt-3 pb-2">
        <p>🎄 Get 30% OFF + FREE Shipping + 2 Bonus Gifts! 🎄</p>
        <p class="text-sm">Family Owned and Operated. All orders shipped from the USA!</p>
    </div>

    <!-- Header -->
    <div class="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden pt-4 pb-10">
        <div class="absolute inset-0 opacity-20 pointer-events-none">
            <div class="absolute top-10 left-10 text-2xl">❄</div>
            <div class="absolute top-20 right-20 text-xl">❄</div>
            <div class="absolute top-32 left-1/4 text-lg">❄</div>
        </div>
        <div class="container mx-auto px-4 py-6 text-center">
            <h1 class="text-4xl font-bold">Complete Your Order</h1>
        </div>
    </div>

    <!-- Progress Steps -->
    <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-center gap-4 max-w-2xl mx-auto">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                    <span class="text-sm">Customize</span>
                </div>
                <div class="h-px w-12 bg-gray-300"></div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                    <span class="text-sm">Checkout</span>
                </div>
                <div class="h-px w-12 bg-gray-300"></div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">3</div>
                    <span class="text-sm text-gray-400">Complete</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
        <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <!-- Order Summary (Right on Desktop) -->
            <div class="lg:col-span-1 lg:order-2">
                <div class="lg:sticky lg:top-4">
                    <div class="bg-blue-50 rounded-lg p-6">
                        <h3 class="text-xl font-bold mb-6 text-center border-b pb-4">Order Summary</h3>
                        <div id="orderItems" class="mb-6 space-y-4"></div>
                        
                        <a href="/letterform.php" class="text-blue-600 hover:underline text-sm block mb-4">+ Add Another Letter</a>
                        
                        <div class="border-t pt-4">
                            <div class="flex justify-between mb-2">
                                <span>Subtotal (<span id="packageCount">0</span> packages)</span>
                                <span id="subtotal">$0.00</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span class="text-green-600">FREE</span>
                            </div>
                            <div class="flex justify-between border-t pt-2 mt-2 font-bold">
                                <span>Total</span>
                                <span id="grandTotal">$0.00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Money Back Guarantee -->
                    <div class="hidden lg:block bg-white rounded-lg p-6 text-center shadow-sm mt-6 border">
                        <div class="text-6xl mb-4">💰</div>
                        <h4 class="font-bold mb-3">100% Money Back Guarantee</h4>
                        <p class="text-sm text-gray-600">If your child doesn't love their letter, we'll refund you 100%</p>
                    </div>
                </div>
            </div>

            <!-- Checkout Form (Left on Desktop) -->
            <div class="lg:col-span-2 lg:order-1">
                
                <!-- Security Badge -->
                <div class="bg-blue-900 text-white rounded-lg p-6 mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="text-4xl">🔒</div>
                        <div>
                            <p class="font-bold">Safe & Secure</p>
                            <p class="text-xs text-blue-200">Order Form</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="text-4xl">🛡️</div>
                        <div class="text-right">
                            <p class="font-bold">256-Bit</p>
                            <p class="text-xs text-blue-200">Encryption</p>
                        </div>
                    </div>
                </div>

                <form id="paymentForm">
                    
                    <!-- Contact Info -->
                    <div class="bg-blue-900 text-white px-6 py-3 rounded-t-lg font-bold">Contact Information</div>
                    <div class="border border-blue-900 rounded-b-lg p-6 mb-6">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-4 text-sm">
                            <strong>Note:</strong> Provide email and/or phone (you can provide both!)
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block font-bold mb-2">Email *</label>
                                <input type="email" id="email" required class="w-full border-2 h-12 px-4 rounded">
                            </div>
                            <div>
                                <label class="block font-bold mb-2">Phone</label>
                                <input type="tel" id="phone" class="w-full border-2 h-12 px-4 rounded">
                            </div>
                        </div>
                    </div>

                    <!-- Billing Info -->
                    <div class="bg-blue-900 text-white px-6 py-3 rounded-t-lg font-bold">Billing Information</div>
                    <div class="border border-blue-900 rounded-b-lg p-6 mb-6">
                        <div class="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block mb-2">First Name *</label>
                                <input type="text" id="firstName" required class="w-full border-2 h-12 px-4 rounded">
                            </div>
                            <div>
                                <label class="block mb-2">Last Name *</label>
                                <input type="text" id="lastName" required class="w-full border-2 h-12 px-4 rounded">
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2">Address *</label>
                            <input type="text" id="address" required class="w-full border-2 h-12 px-4 rounded">
                        </div>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <label class="block mb-2">City *</label>
                                <input type="text" id="city" required class="w-full border-2 h-12 px-4 rounded">
                            </div>
                            <div>
                                <label class="block mb-2">State *</label>
                                <select id="state" required class="w-full border-2 h-12 px-4 rounded bg-white">
                                    <option value="">Select</option>
                                    <option value="AL">Alabama</option>
                                    <option value="CA">California</option>
                                    <option value="FL">Florida</option>
                                    <option value="NY">New York</option>
                                    <option value="TX">Texas</option>
                                    <!-- Add all states -->
                                </select>
                            </div>
                            <div>
                                <label class="block mb-2">ZIP *</label>
                                <input type="text" id="zip" required pattern="[0-9]{5}" class="w-full border-2 h-12 px-4 rounded">
                            </div>
                        </div>
                    </div>

                    <!-- Shipping Date -->
                    <div class="bg-red-600 text-white px-6 py-3 rounded-t-lg font-bold">📅 Shipping Date</div>
                    <div class="border border-red-600 rounded-b-lg p-6 mb-6">
                        <div class="space-y-3">
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="shippingDate" value="dec1" class="mr-3">
                                <span>December 1st</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="shippingDate" value="dec10" class="mr-3">
                                <span>December 10th</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="shippingDate" value="dec15" checked class="mr-3">
                                <span>December 15th (Recommended)</span>
                            </label>
                        </div>
                    </div>

                    <!-- Monthly Subscription -->
                    <div class="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-6 mb-6">
                        <label class="flex items-start gap-4 cursor-pointer">
                            <input type="checkbox" id="monthlySubscription" class="mt-1 h-6 w-6">
                            <div>
                                <h4 class="text-lg font-bold mb-2">🎁 YES! Add Monthly Letters + 2 FREE Gifts!</h4>
                                <p class="text-sm mb-2">Get a letter every month starting January 2025</p>
                                <p class="text-xs">Only $12/month. Cancel anytime!</p>
                            </div>
                        </label>
                    </div>

                    <!-- Payment -->
                    <div class="bg-blue-900 text-white px-6 py-3 rounded-t-lg font-bold">Payment Information</div>
                    <div class="border border-blue-900 rounded-b-lg p-6 mb-6">
                        <div id="cardElement" class="mb-4"></div>
                        <div id="cardErrors" class="text-red-600 text-sm"></div>
                    </div>

                    <button type="submit" id="submitBtn" class="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl font-bold transition shadow-lg">
                        Complete Order Securely 🎅
                    </button>
                    
                    <div id="paymentStatus" class="mt-4 text-center"></div>
                </form>

            </div>
        </div>
    </div>

    <script>
        const packages = JSON.parse(localStorage.getItem('santaLetterPackages') || '[]');
        
        // Redirect if no packages
        if (packages.length === 0) {
            window.location.href = '/letterform.php';
        }

        // Render order summary
        function renderOrder() {
            let total = 0;
            const html = packages.map((pkg, idx) => {
                const price = pkg.packagePrice || 19.99;
                total += price;
                return `
                    <div class="pb-4 border-b">
                        <div class="flex justify-between mb-2">
                            <div>
                                <p class="font-semibold">${pkg.packageName}</p>
                                <p class="text-sm text-gray-600">$${price.toFixed(2)}</p>
                            </div>
                            <div class="flex flex-col gap-1">
                                <a href="/letterform.php" onclick="editPackage(${idx})" class="text-xs text-blue-600 hover:underline">Edit</a>
                                <button onclick="deletePackage(${idx})" class="text-xs text-red-600 hover:underline">Delete</button>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600">${pkg.childFirstName} ${pkg.childLastName}</p>
                        <p class="text-sm text-gray-600">${pkg.city}, ${pkg.state}</p>
                    </div>
                `;
            }).join('');
            
            document.getElementById('orderItems').innerHTML = html;
            document.getElementById('packageCount').textContent = packages.length;
            document.getElementById('subtotal').textContent = `$${total.toFixed(2)}`;
            document.getElementById('grandTotal').textContent = `$${total.toFixed(2)}`;
        }

        function editPackage(idx) {
            localStorage.setItem('editingPackageIndex', idx);
        }

        function deletePackage(idx) {
            if (confirm('Delete this letter?')) {
                packages.splice(idx, 1);
                localStorage.setItem('santaLetterPackages', JSON.stringify(packages));
                if (packages.length === 0) {
                    window.location.href = '/letterform.php';
                } else {
                    renderOrder();
                }
            }
        }

        renderOrder();

        // Stripe
        const stripe = Stripe('pk_live_51SIHQT2NsH2CKfRANHrn5PsrTTnvRY0t5QStLGW8W3ihy4dhFVhDX4ZIP3lrOYhA1HPtnflUgDAhDxEZ0TgNB1V000lsmZhQBB');
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#cardElement');

        cardElement.on('change', (e) => {
            document.getElementById('cardErrors').textContent = e.error ? e.error.message : '';
        });

        // Form submit
        document.getElementById('paymentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = document.getElementById('submitBtn');
            const status = document.getElementById('paymentStatus');
            
            btn.disabled = true;
            btn.textContent = 'Processing...';
            status.innerHTML = '<p class="text-blue-600">Processing payment...</p>';

            try {
                const total = packages.reduce((sum, pkg) => sum + (pkg.packagePrice || 19.99), 0);
                const billingData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zip: document.getElementById('zip').value,
                    shippingDate: document.querySelector('input[name="shippingDate"]:checked').value
                };
                const monthlySubscription = document.getElementById('monthlySubscription').checked;

                // Create payment intent
                const createRes = await fetch('https://zdufkwflqbfppldctjdh.supabase.co/functions/v1/make-server-cf244566/create-payment-intent', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWZrd2ZscWJmcHBsZGN0amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2ODQ0MzYsImV4cCI6MjA1MTI2MDQzNn0.F2JQvl7lJ6NLe8ym7AMQqLdOYeFxMhBGOZmqg4cPvuc'
                    },
                    body: JSON.stringify({ letterPackages: packages, billingData, monthlySubscription, total })
                });
                const { clientSecret } = await createRes.json();

                // Confirm payment
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: `${billingData.firstName} ${billingData.lastName}`,
                            email: billingData.email
                        }
                    }
                });

                if (error) throw new Error(error.message);

                // Save order
                const saveRes = await fetch('https://zdufkwflqbfppldctjdh.supabase.co/functions/v1/make-server-cf244566/confirm-payment', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWZrd2ZscWJmcHBsZGN0amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2ODQ0MzYsImV4cCI6MjA1MTI2MDQzNn0.F2JQvl7lJ6NLe8ym7AMQqLdOYeFxMhBGOZmqg4cPvuc'
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentIntent.id,
                        letterPackages: packages,
                        billingData,
                        monthlySubscription,
                        total
                    })
                });
                const data = await saveRes.json();

                localStorage.setItem('orderToken', data.accessToken);
                localStorage.setItem('orderAmount', total.toString());
                localStorage.setItem('subscriptionAccepted', monthlySubscription.toString());
                
                window.location.href = '/upsell.php';

            } catch (err) {
                status.innerHTML = `<p class="text-red-600">Error: ${err.message}</p>`;
                btn.disabled = false;
                btn.textContent = 'Complete Order Securely 🎅';
            }
        });
    </script>

</body>
</html>
