class ApiUtils{
    constructor(apiContext,loginPayload){

        this.apiContext=apiContext
        this.loginPayload=loginPayload

    }

    async getToken(){
        const loginResponse= await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:this.loginPayload
        }
        
        )
    
        //expect(loginResponse.ok()).toBeTruthy();
        const responseJson= await loginResponse.json();
        const token=responseJson.token;
        console.log(token)
        return token;

    }

    async createOrder(createOrderPayload){

        let response={}
        response.token= await this.getToken();
        const createOrderRes=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:createOrderPayload,
            headers:
            {
                'Content-type':'application/json',
                'Authorization':response.token
    
            },
      
        })
        
        const oderRespJson= await createOrderRes.json()
        const orderID=oderRespJson.orders[0]
        response.orderID=orderID;
        console.log("orderid: ".concat(oderRespJson.orders[0]));
        return response;

    }
}

module.exports={ApiUtils};
