<template>
    <div class="flex flex-col items-center justify-center" style="min-height:100vh">
        <div class="border border-gray px-8 py-12 bg-white shadow" style="width:30vw; min-height:50vh">
            <h3 class="text-center text-large font-semibold">Reset Password</h3>
            <p class="text-body-2 text-gray ">Send a link to your email to reset password</p>
            <div class="mt-6 mb-3">
                <label for="" class="text-medium font-light">New Password</label>
                <input type="text" placeholder="" class="border border-gray w-full py-3 text-medium rounded-sm">
            </div>
            <div class="mb-4">
                <label for="" class="text-medium font-light">Confirm Password</label>
                <input type="text" placeholder="" class="border border-gray w-full py-3 text-medium rounded-sm">
            </div>
            <button class="bg-blue-base py-4 rounded-sm text-white text-medium w-full my-4">Save new password</button>
        </div>
    </div>
</template>
