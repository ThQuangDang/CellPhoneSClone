// export const VNPAY_GATEWAY_SANDBOX_HOST = 'https://sandbox.vnpayment.vn';

// export const PAYMENT_ENDPOINT = 'paymentv2/vpcpay.html';

// const redirectUrl = new URL(
//     resolveUrlString(
//         this.globalDefaultConfig.vnpayHost ?? VNPAY_GATEWAY_SANDBOX_HOST,
//         this.globalDefaultConfig.paymentEndpoint ?? PAYMENT_ENDPOINT,
//     ),
// );

// Object.entries(vnp_Params)
// .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
// .forEach(([key, value]) => {
//     //Skip empty value
//     if(!value || value === "" || value === undefined || value === null) {
//         return
//     }

//     redirectUrl.searchParams.append(key, value.toString())
// })

// var crypto = require("crypto")
// const hmac = crypto.createHmac("sha512", secretKey)
// const signed = hmac.update(Buffer.from(redirectUrl.search.slice(1).toString(), "utf-8")).digest("hex")

// redirectUrl.searchParams.append("vnp_SecureHash", signed)

//return_payment

const secureHash = query.vnp_SecureHash;

// Will be remove when append to URLSearchParams
delete query.vnp_SecureHash;
delete query.vnp_SecureHashType;


const searchParams = new URLSearchParams();
Object.entries(query)
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .forEach(([key, value]) => {
        // Skip empty value
        if (value === '' || value === undefined || value === null) {
            return;
        }

        searchParams.append(key, value.toString());
    });

    const signed = hash(
        this.globalDefaultConfig.secureSecret,
        Buffer.from(searchParams.toString(), this.BUFFER_ENCODE),
        this.HASH_ALGORITHM,
    );

    if (secureHash !== signed) {
        Object.assign(outputResults, {
            isVerified: false,
            message: 'Wrong checksum',
        });
    }

    
//https://github.com/lehuygiang28/vnpay