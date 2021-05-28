

const base_url = 'https://us-central1-the-shuk-marketplace.cloudfunctions.net'

export const buyItem = async (token, item) => {
    try {
        console.log('/payWithStripe', {
            amount: parseFloat(item.price),
            currency: "usd",
            token: token.tokenId
        })
        const resp = await fetch(`${base_url}/payWithStripe`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseFloat(item.price) * 100,
                currency: "usd",
                token: token.tokenId
            }),
        })
        let responseText = await resp.text()
        if (responseText) {
            const responseBody = JSON.parse(responseText)
            return resp.ok ? Promise.resolve(responseBody) : Promise.reject(responseBody)
        } else {
            return Promise.reject(responseText)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}
export const getBalance = async (account, amount, source_transaction) => {
    try {
        console.log('/the-shuk/us-central1/transferWithStripe', {
            amount: amount,
            currency: "usd",
            account,
            source_transaction
        })
        const resp = await fetch(`${base_url}/transferWithStripe`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100,
                currency: "usd",
                account,
                source_transaction
            }),
        })
        let responseText = await resp.text()
        if (responseText) {
            const responseBody = JSON.parse(responseText)
            return resp.ok ? Promise.resolve(responseBody) : Promise.reject(responseBody)
        } else {
            return Promise.reject(responseText)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}
export const getAccountInfo = async (authorizationCode) => {
    try {
        const resp = await fetch(`${base_url}/getStripeInfo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authorizationCode 
            }),
        })
        let responseText = await resp.text()
        if (responseText) {
            const responseBody = JSON.parse(responseText)
            return resp.ok ? Promise.resolve(responseBody) : Promise.reject(responseBody)
        } else {
            return Promise.reject(responseText)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}