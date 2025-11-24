<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customize Your Santa Letter</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
    </style>
</head>
<body class="bg-gradient-to-b from-red-50 to-green-50">
    
    <!-- Header -->
    <div class="bg-red-600 text-white text-center py-4">
        <h1 class="text-3xl font-bold">🎅 Customize Your Santa Letter</h1>
        <p class="text-sm">Personalized & Certified from the North Pole</p>
    </div>

    <!-- Main Container -->
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        
        <!-- Package Selection -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold text-center mb-6">Choose Your Package</h2>
            
            <div class="grid md:grid-cols-3 gap-4">
                <!-- Silver Package -->
                <div class="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition" onclick="selectPackage('basic', 19.99)">
                    <div class="text-center">
                        <div class="text-4xl mb-2">🥈</div>
                        <h3 class="text-xl font-bold mb-2">Silver Edition</h3>
                        <div class="text-3xl font-bold text-blue-600 mb-4">$19.99</div>
                        <ul class="text-sm text-left space-y-2">
                            <li>✓ Personalized Letter</li>
                            <li>✓ Santa's Signature</li>
                            <li>✓ North Pole Postmark</li>
                        </ul>
                    </div>
                </div>

                <!-- Gold Package -->
                <div class="border-2 border-yellow-500 rounded-lg p-4 cursor-pointer hover:border-yellow-600 transition bg-yellow-50" onclick="selectPackage('deluxe', 29.99)">
                    <div class="text-center">
                        <div class="text-4xl mb-2">🥇</div>
                        <h3 class="text-xl font-bold mb-2">Gold Edition</h3>
                        <div class="text-3xl font-bold text-yellow-600 mb-4">$29.99</div>
                        <ul class="text-sm text-left space-y-2">
                            <li>✓ Everything in Silver</li>
                            <li>✓ Nice List Certificate</li>
                            <li>✓ Santa Photo</li>
                        </ul>
                    </div>
                </div>

                <!-- Platinum Package -->
                <div class="border-2 border-purple-500 rounded-lg p-4 cursor-pointer hover:border-purple-600 transition bg-purple-50" onclick="selectPackage('premium', 59.99)">
                    <div class="text-center">
                        <div class="text-4xl mb-2">💎</div>
                        <h3 class="text-xl font-bold mb-2">Platinum Edition</h3>
                        <div class="text-3xl font-bold text-purple-600 mb-4">$59.99</div>
                        <ul class="text-sm text-left space-y-2">
                            <li>✓ Everything in Gold</li>
                            <li>✓ Reindeer Food</li>
                            <li>✓ Magic Key</li>
                            <li>✓ Santa's Phone Call</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Letter Form -->
        <form id="letterForm" class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-6">Letter Details</h2>

            <input type="hidden" id="packageType" name="packageType" required>
            <input type="hidden" id="packagePrice" name="packagePrice" required>

            <!-- Child Information -->
            <div class="mb-6">
                <h3 class="text-lg font-bold mb-4 text-blue-900">Child Information</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">Child's First Name *</label>
                        <input type="text" id="childFirstName" name="childFirstName" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">Child's Last Name *</label>
                        <input type="text" id="childLastName" name="childLastName" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">Age *</label>
                        <input type="number" id="age" name="age" min="1" max="18" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">Gender</label>
                        <select id="gender" name="gender" class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500 bg-white">
                            <option value="">Select</option>
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Shipping Address -->
            <div class="mb-6">
                <h3 class="text-lg font-bold mb-4 text-blue-900">Shipping Address</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2 font-bold">Street Address *</label>
                    <input type="text" id="streetAddress" name="streetAddress" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Apt/Unit</label>
                    <input type="text" id="unitApt" name="unitApt" class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">City *</label>
                        <input type="text" id="city" name="city" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">State *</label>
                        <select id="state" name="state" required class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500 bg-white">
                            <option value="">Select State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 mb-2 font-bold">ZIP Code *</label>
                        <input type="text" id="zipCode" name="zipCode" required pattern="[0-9]{5}" class="w-full border-2 border-gray-300 h-12 px-4 rounded focus:border-blue-500">
                    </div>
                </div>
            </div>

            <!-- Letter Personalization -->
            <div class="mb-6">
                <h3 class="text-lg font-bold mb-4 text-blue-900">Personalization (Optional)</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Accomplishments This Year</label>
                    <textarea id="accomplishments" name="accomplishments" rows="3" class="w-full border-2 border-gray-300 px-4 py-2 rounded focus:border-blue-500" placeholder="e.g., Learned to read, got good grades, helped at home"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Wish List (Top 3 Items)</label>
                    <textarea id="wishList" name="wishList" rows="3" class="w-full border-2 border-gray-300 px-4 py-2 rounded focus:border-blue-500" placeholder="e.g., Bicycle, Lego set, Art supplies"></textarea>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
                <button type="submit" id="submitBtn" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl font-bold transition shadow-lg">
                    Save & Continue to Checkout
                </button>
                <button type="button" onclick="saveAndAddAnother()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-xl font-bold transition shadow-lg">
                    Save & Add Another Letter
                </button>
            </div>
        </form>

        <!-- Current Letters Summary -->
        <div id="lettersSummary" class="mt-6 bg-white rounded-lg shadow-lg p-6 hidden">
            <h3 class="text-xl font-bold mb-4">Letters in Your Order (<span id="letterCount">0</span>)</h3>
            <div id="lettersContainer"></div>
        </div>

    </div>

    <script>
        let packages = JSON.parse(localStorage.getItem('santaLetterPackages') || '[]');
        let editingIndex = localStorage.getItem('editingPackageIndex');
        let selectedPackage = null;

        // If editing, load the package data
        if (editingIndex !== null) {
            editingIndex = parseInt(editingIndex);
            const pkg = packages[editingIndex];
            if (pkg) {
                loadPackageForEdit(pkg);
            }
            localStorage.removeItem('editingPackageIndex');
        }

        function selectPackage(type, price) {
            selectedPackage = { type, price };
            document.getElementById('packageType').value = type;
            document.getElementById('packagePrice').value = price;
            
            // Visual feedback
            document.querySelectorAll('[onclick^="selectPackage"]').forEach(el => {
                el.classList.remove('ring-4', 'ring-blue-500');
            });
            event.currentTarget.classList.add('ring-4', 'ring-blue-500');
        }

        function loadPackageForEdit(pkg) {
            // Pre-select package type
            if (pkg.packageType) {
                const price = pkg.packageType === 'basic' ? 19.99 : pkg.packageType === 'deluxe' ? 29.99 : 59.99;
                selectPackage(pkg.packageType, price);
            }

            // Fill form fields
            document.getElementById('childFirstName').value = pkg.childFirstName || '';
            document.getElementById('childLastName').value = pkg.childLastName || '';
            document.getElementById('age').value = pkg.age || '';
            document.getElementById('gender').value = pkg.gender || '';
            document.getElementById('streetAddress').value = pkg.streetAddress || '';
            document.getElementById('unitApt').value = pkg.unitApt || '';
            document.getElementById('city').value = pkg.city || '';
            document.getElementById('state').value = pkg.state || '';
            document.getElementById('zipCode').value = pkg.zipCode || '';
            document.getElementById('accomplishments').value = pkg.accomplishments || '';
            document.getElementById('wishList').value = pkg.wishList || '';
        }

        function getFormData() {
            return {
                packageType: document.getElementById('packageType').value,
                packagePrice: parseFloat(document.getElementById('packagePrice').value),
                packageName: selectedPackage ? 
                    (selectedPackage.type === 'basic' ? 'Silver Edition' : 
                     selectedPackage.type === 'deluxe' ? 'Gold Edition' : 'Platinum Edition') : '',
                childFirstName: document.getElementById('childFirstName').value,
                childLastName: document.getElementById('childLastName').value,
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                streetAddress: document.getElementById('streetAddress').value,
                unitApt: document.getElementById('unitApt').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                accomplishments: document.getElementById('accomplishments').value,
                wishList: document.getElementById('wishList').value
            };
        }

        function saveAndAddAnother() {
            if (!document.getElementById('letterForm').checkValidity()) {
                document.getElementById('letterForm').reportValidity();
                return;
            }

            const formData = getFormData();
            
            if (editingIndex !== null && editingIndex >= 0) {
                packages[editingIndex] = formData;
            } else {
                packages.push(formData);
            }

            localStorage.setItem('santaLetterPackages', JSON.stringify(packages));
            
            // Reset form
            document.getElementById('letterForm').reset();
            selectedPackage = null;
            editingIndex = null;
            
            // Update summary
            updateLettersSummary();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            alert('Letter saved! Add another or continue to checkout.');
        }

        function updateLettersSummary() {
            const summary = document.getElementById('lettersSummary');
            const container = document.getElementById('lettersContainer');
            const count = document.getElementById('letterCount');
            
            if (packages.length > 0) {
                summary.classList.remove('hidden');
                count.textContent = packages.length;
                
                container.innerHTML = packages.map((pkg, idx) => `
                    <div class="border-b py-2 flex justify-between items-center">
                        <div>
                            <strong>${pkg.packageName}</strong> - ${pkg.childFirstName} ${pkg.childLastName}
                        </div>
                        <div class="flex gap-2">
                            <button onclick="editLetter(${idx})" class="text-blue-600 text-sm hover:underline">Edit</button>
                            <button onclick="deleteLetter(${idx})" class="text-red-600 text-sm hover:underline">Delete</button>
                        </div>
                    </div>
                `).join('');
            } else {
                summary.classList.add('hidden');
            }
        }

        function editLetter(idx) {
            editingIndex = idx;
            loadPackageForEdit(packages[idx]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function deleteLetter(idx) {
            if (confirm('Are you sure you want to delete this letter?')) {
                packages.splice(idx, 1);
                localStorage.setItem('santaLetterPackages', JSON.stringify(packages));
                updateLettersSummary();
            }
        }

        // Form submission
        document.getElementById('letterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = getFormData();
            
            if (editingIndex !== null && editingIndex >= 0) {
                packages[editingIndex] = formData;
            } else {
                packages.push(formData);
            }

            localStorage.setItem('santaLetterPackages', JSON.stringify(packages));
            
            // Redirect to checkout
            window.location.href = '/checkout.php';
        });

        // Initialize summary
        updateLettersSummary();
    </script>

</body>
</html>
