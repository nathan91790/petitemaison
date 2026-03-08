import { sleep } from "k6";
import http from "k6/http";

export const options = {
    vus: 10,
    duration: "5s",
    thresholds: {
        http_req_duration: ['p(95)<300'],
    }
};

export default function () {
    http.get("http://localhost:3000/api/products");
    sleep(1);
}
