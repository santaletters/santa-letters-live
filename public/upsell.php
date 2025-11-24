<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Special Offer - Santa's Certified Letters</title>
    
    <!-- HARDCODED TRACKDESK PIXEL - SALE -->
    <script>
        (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
    </script>
    <script src="//cdn.trackdesk.com/tracking.js" async></script>
    <script>
        window.addEventListener('load', function() {
            console.log('🎯 SALE PIXEL FIRING');
            const amount = parseFloat(localStorage.getItem('orderAmount') || '0');
            const token = localStorage.getItem('orderToken') || '';
            
            if (window.trackdesk && amount > 0) {
                window.trackdesk("directwebinteractive", "conversion", {
                    "conversionType": "sale",
                    "orderId": token,
                    "amount": amount
                });
                console.log('✅ SALE PIXEL FIRED:', { amount, orderId: token });
            }
        });
    </script>
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse { animation: pulse 2s infinite; }
    </style>
</head>
<body>

    <div class="min-h-screen bg-gradient-to-br from-red-700 via-green-700 to-red-800 flex items-center justify-center p-4">
        <div class="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            <!-- Timer Banner -->
            <div class="bg-red-600 text-white py-4 px-6 flex items-center justify-center gap-2">
                <span class="text-2xl animate-pulse">⏰</span>
                <span class="text-lg font-bold">Limited Offer: <span id="timer">2:00</span></span>
            </div>

            <!-- Main Content -->
            <div class="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
                
                <!-- Product Image (Left) -->
                <div class="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
                    <img 
                        src="https://images.unsplash.com/photo-1673298062288-2df0ce037a1a?w=600" 
                        alt="North Pole Snow"
                        class="w-full max-w-sm rounded-lg shadow-xl mb-4"
                    />
                    <h3 class="text-2xl font-bold text-blue-900 mb-2">🎄 Authentic North Pole Snow</h3>
                    <p class="text-gray-600 mb-4">Certified & Collectible</p>
                    
                    <ul class="space-y-2 w-full max-w-md">
                        <li class="flex items-start gap-2">
                            <span class="text-green-600 text-xl">✓</span>
                            <span>Authentic certified snow from the North Pole</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-600 text-xl">✓</span>
                            <span>Beautiful collectible jar with certificate</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-600 text-xl">✓</span>
                            <span>Perfect keepsake to treasure forever</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-green-600 text-xl">✓</span>
                            <span>Ships FREE with your order</span>
                        </li>
                    </ul>
                </div>

                <!-- Offer Details (Right) -->
                <div class="flex flex-col justify-start">
                    <h1 class="text-4xl font-bold text-red-700 mb-4">
                        🎁 Wait! Add Certified North Pole Snow!
                    </h1>
                    <p class="text-lg text-gray-700 mb-6">
                        Complete your magical experience with authentic snow from the North Pole! 
                        This special jar makes the perfect keepsake.
                    </p>

                    <!-- Price Badge -->
                    <div class="bg-green-50 border-2 border-green-600 rounded-xl p-4 mb-6">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700 font-medium">Special One-Time Offer</span>
                            <span class="text-4xl font-bold text-green-700">$9.99</span>
                        </div>
                        <p class="text-sm text-gray-600">per jar</p>
                    </div>

                    <!-- Quantity Selector -->
                    <div class="mb-6">
                        <label class="block font-bold text-center mb-4">Select Quantity:</label>
                        
                        <!-- Quick Buttons -->
                        <div class="flex gap-2 justify-center mb-4">
                            <button onclick="setQty(1)" id="btn1" class="px-6 py-3 rounded-lg font-bold bg-green-600 text-white">1</button>
                            <button onclick="setQty(2)" id="btn2" class="px-6 py-3 rounded-lg font-bold bg-gray-200">2</button>
                            <button onclick="setQty(3)" id="btn3" class="px-6 py-3 rounded-lg font-bold bg-gray-200">3</button>
                            <button onclick="setQty(4)" id="btn4" class="px-6 py-3 rounded-lg font-bold bg-gray-200">4</button>
                            <button onclick="setQty(5)" id="btn5" class="px-6 py-3 rounded-lg font-bold bg-gray-200">5</button>
                        </div>

                        <!-- Plus/Minus -->
                        <div class="flex items-center gap-4 justify-center mb-4">
                            <button onclick="qty > 1 && setQty(qty-1)" class="px-8 py-3 border-2 rounded-lg text-xl font-bold">−</button>
                            <div class="text-center">
                                <div class="text-4xl font-bold" id="qtyDisplay">1</div>
                                <div class="text-sm text-gray-600" id="qtyLabel">jar</div>
                            </div>
                            <button onclick="setQty(qty+1)" class="px-8 py-3 border-2 rounded-lg text-xl font-bold">+</button>
                        </div>

                        <!-- Total -->
                        <div class="text-center py-3 bg-gray-50 rounded-lg">
                            <span class="text-gray-700">Total: </span>
                            <span class="text-3xl font-bold text-green-700" id="total">$9.99</span>
                        </div>
                    </div>

                    <!-- Error -->
                    <div id="error" class="hidden mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700"></div>

                    <!-- Buttons -->
                    <button 
                        onclick="acceptOffer()" 
                        id="acceptBtn"
                        class="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl font-bold rounded-lg shadow-lg mb-3 transition"
                    >
                        ✓ Yes! Add <span id="btnQty">1</span> <span id="btnLabel">Jar</span> for $<span id="btnPrice">9.99</span>
                    </button>

                    <button 
                        onclick="declineOffer()" 
                        class="w-full text-gray-600 hover:text-gray-800 py-3"
                    >
                        No thanks, I don't want this special offer
                    </button>

                    <p class="text-center text-sm text-gray-500 mt-3">
                        🔒 Secure • 💳 Same payment method
                    </p>
                </div>

            </div>
        </div>
    </div>

    <script>
        let qty = 1;
        let processing = false;
        let timeLeft = 120;

        // Timer
        const interval = setInterval(() => {
            timeLeft--;
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            document.getElementById('timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                declineOffer();
            }
        }, 1000);

        function setQty(n) {
            qty = n;
            updateUI();
        }

        function updateUI() {
            document.getElementById('qtyDisplay').textContent = qty;
            document.getElementById('qtyLabel').textContent = qty === 1 ? 'jar' : 'jars';
            
            const total = (9.99 * qty).toFixed(2);
            document.getElementById('total').textContent = `$${total}`;
            document.getElementById('btnQty').textContent = qty;
            document.getElementById('btnLabel').textContent = qty === 1 ? 'Jar' : 'Jars';
            document.getElementById('btnPrice').textContent = total;
            
            // Update buttons
            for (let i = 1; i <= 5; i++) {
                const btn = document.getElementById('btn' + i);
                btn.className = i === qty 
                    ? 'px-6 py-3 rounded-lg font-bold bg-green-600 text-white' 
                    : 'px-6 py-3 rounded-lg font-bold bg-gray-200';
            }
        }

        async function acceptOffer() {
            if (processing) return;
            processing = true;
            
            const btn = document.getElementById('acceptBtn');
            const errorDiv = document.getElementById('error');
            
            btn.textContent = 'Processing...';
            btn.disabled = true;
            errorDiv.classList.add('hidden');

            try {
                const token = localStorage.getItem('orderToken');
                
                const res = await fetch('https://zdufkwflqbfppldctjdh.supabase.co/functions/v1/make-server-cf244566/upsell/accept-snow', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdWZrd2ZscWJmcHBsZGN0amRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2ODQ0MzYsImV4cCI6MjA1MTI2MDQzNn0.F2JQvl7lJ6NLe8ym7AMQqLdOYeFxMhBGOZmqg4cPvuc'
                    },
                    body: JSON.stringify({ orderToken: token, quantity: qty })
                });

                const data = await res.json();
                
                if (data.success) {
                    btn.textContent = '✅ Added!';
                    setTimeout(() => redirectToSuccess(), 1000);
                } else {
                    throw new Error(data.error || 'Failed');
                }

            } catch (err) {
                errorDiv.textContent = err.message;
                errorDiv.classList.remove('hidden');
                btn.textContent = `✓ Yes! Add ${qty} ${qty === 1 ? 'Jar' : 'Jars'} for $${(9.99 * qty).toFixed(2)}`;
                btn.disabled = false;
                processing = false;
            }
        }

        function declineOffer() {
            redirectToSuccess();
        }

        function redirectToSuccess() {
            const token = localStorage.getItem('orderToken');
            const subscription = localStorage.getItem('subscriptionAccepted') === 'true';
            
            if (subscription) {
                window.location.href = '/?token=' + token;
            } else {
                window.location.href = '/?token=' + token + '&fromCheckout=true';
            }
        }

        updateUI();
    </script>

</body>
</html>
