import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const ViewPayments = () => {
    const axiosPublic = useAxiosPublic();

    const fetchPayments = async () => {
        const res = await axiosPublic.get('/dashboard/admin/payments');
        return res.data;
    };

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: fetchPayments
    });
    // console.log(payments);
    return (
        <div className='border rounded-3xl py-6 my-10 px-20 shadow-xl bg-blue-100'>
            <h2 className="text-4xl font-bold mb-4 text-center font-sedan text-blue-950">View Payments</h2>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className='font-bold text-xl text-blue-900'>Transaction ID</th>
                        <th className='font-bold text-xl text-blue-900'>Email</th>
                        <th className='font-bold text-xl text-blue-900'>Amount</th>
                        <th className='font-bold text-xl text-blue-900'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id}>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{payment.transactionId}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{payment.email}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{payment.price}</td>
                            <td className='font-semibold text-sm font-rubik text-blue-950'>{payment.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPayments;
