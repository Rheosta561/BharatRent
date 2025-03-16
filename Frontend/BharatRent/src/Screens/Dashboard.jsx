import React from 'react'
import Navbar from './Navabar'
import FeatureCard from './FeatureCard'
import ProblemCard from './ProblemCard'
import Footer from './Footer'
import vikrant from '../vikrant.png'

import { useState, useEffect } from 'react';
import axios from 'axios';
function Dashboard() {

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios
        .get('http://localhost:3000/user-details', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsername(response.data.username);
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);
  
  useEffect(() => {
    console.log('User details:', userId);
  }, [userId]); // This ensures it logs after `userId` is updated
  
  return (
    <div>
      <Navbar />

      <div className="relative h-56 w-screen">

        <img 
          src="https://plus.unsplash.com/premium_photo-1661333820879-517c5e808bfe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGF3eWVyfGVufDB8fDB8fHww"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Background"
        />


        <div className="absolute  flex flex-col h-full  justify-between text-white p-4 ">
          <div className="text-3xl font-semibold">BharatRent
          <p className="text-sm font-normal">Your True Legal Companion</p></div>
          <div className="mt-4 underline text-sm cursor-pointer">Explore more features</div>
        </div>
      </div>

      <div className="w-screen text-6xl mt-3 text-center font-semibold 
      bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-500
      bg-clip-text text-transparent">
  Hi {username || 'User'}
</div>

      <div className='mx-2 text-center text-gray-800'>BharatRent Brings you the most useful features to ease your rental experience</div>
      <div className='mx-2 border mt-2 h-fit rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 p-2 bg-gray-50 '>
        <FeatureCard title="Seamless Rental Agreement Creation " img="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWdyZWVtZW50fGVufDB8fDB8fHww" desc="Quickly generate legally valid rental agreements using pre-verified templates. Customize agreements as per landlord and tenant requirements while ensuring compliance with local rental laws." link = "/RentAgreement"/>
        <FeatureCard title = "Secure & Verified Payments" desc="Encrypted transactions for rent payments, security deposits, and other charges. Supports multiple payment gateways like Stripe, Razorpay, and UPI for hassle-free transactions." img="https://media.gettyimages.com/id/1961788019/photo/secure-mobile-payment.jpg?s=612x612&w=0&k=20&c=7tM01gbOlATQouqzM7kwpsjeotsh_7vHnyaBlt3QfhE=" link ="/coming-soon"/>
        <FeatureCard title ="Advanced Identity & Financial Verification" desc="Ensures both tenant and landlord authenticity through Aadhaar, PAN, and government ID verification. Credit/Debit history analysis prevents fraud and defaults, ensuring trust and reliability." img="https://img.freepik.com/free-vector/hand-with-mobile-face-scan-man_24908-56380.jpg?t=st=1742112306~exp=1742115906~hmac=7684602c92c08b4f9fc41848347e886e386f02f8f9b94de3b83e008f407c2aaf&w=1380" link ="/coming-soon"/>
        <FeatureCard title = "AI-Powered Dispute Resolution" desc=" Integrated chatbot offers real-time guidance on disputes and legal proceedings. Automates mediation processes and provides legal support options for faster resolutions."
        img="https://img.freepik.com/free-photo/discussing-busines-report_1098-16536.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid" link="/chatbot"/>
        <FeatureCard title = "Smart Contract Summarization" desc="AI-driven contract analysis extracts and highlights key terms, making agreements easier to understand. Ensures users are aware of rent escalation clauses, maintenance responsibilities, and termination conditions."
        img="https://plus.unsplash.com/premium_photo-1661384314885-2976d3edd919?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjBjb250cmFjdHxlbnwwfHwwfHx8MA%3D%3D" link="/contract-summarisation"/>
        <FeatureCard title="Subscription-Based Services for Landlords & Property Managers" desc="Premium plans for automated rent collection, maintenance tracking, and legal support. Custom dashboard for managing multiple properties with automated reminders and reports." img="https://media.gettyimages.com/id/2188909288/photo/mutual-agreement-and-handshake.jpg?s=612x612&w=0&k=20&c=uce_6nOrTpTm5mQApk4ZwaZ_lR1YVnnWNYdTBO4rnZk="/>
        <FeatureCard title = "Collaborations with Real Estate Agencies & Legal Firms" desc = "Pre-vetted rental agreements drafted with legal experts for standardization. Enables seamless adoption in the real estate ecosystem, driving platform credibility and revenue." img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGFnZW50fGVufDB8fDB8fHww" link ="/coming-soon"/>
      </div>
      <br />
      <br />
      <div className='text-center text-5xl font-semibold underline '>Why <span className='text-emerald-950'>Bharat</span>Rent ?</div>
      <div className='h-44 w-44 mx-auto mt-2 rounded-full '>
        <img src="https://img.freepik.com/free-vector/hand-drawn-shrug-illustration_23-2149318022.jpg?t=st=1742109668~exp=1742113268~hmac=9c1737b872b89892323be022e821443b3c9fb35e16ecf5c4d249df981cfebe19&w=1380 " className='h-full w-full rounded-full' alt="" />
      </div>
      <div className='mx-10 text-center text-md text-zinc-900'>What makes BharatRent different from other players available in the market ? </div>
        <br />
        <ProblemCard title = "Meet The Verified Brokers" desc="Connecting with verified brokers ensures a smooth and secure experience in property transactions. These professionals bring credibility, market expertise, and transparency to the process, whether you're buying, selling, or renting. During the meeting, you can expect in-depth discussions about market trends, legal formalities, and personalized options tailored to your needs. Their verified status guarantees adherence to ethical practices, reducing risks and ensuring a hassle-free transaction." img="https://img.freepik.com/free-vector/realtor-assistance_23-2148672112.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <ProblemCard title = "AI-Powered Legal Assistant" desc="The AI-Powered Legal Assistant is an intelligent chatbot designed to provide real-time legal guidance and automate essential legal processes related to rental agreements. It offers instant legal advice on topics such as security deposits, eviction policies, and rent control regulations, ensuring that both landlords and tenants are aware of their rights and obligations. The chatbot can also generate automated legal notices, including rent payment reminders, eviction warnings, and breach-of-contract alerts, streamlining communication between parties. Additionally, it assists in dispute resolution by suggesting mediation strategies and outlining legal escalation steps based on rental laws and past case studies. To further enhance transparency, the assistant includes a compliance checker that ensures agreements adhere to local housing regulations, minimizing potential legal conflicts. With multi-language support, it makes legal guidance accessible to a diverse user base, ensuring that all users, regardless of their legal expertise, can navigate rental agreements with ease." img={vikrant}/>
        <ProblemCard title = "Rent Payment Auto-Debit & Reminders" desc="The Rent Payment Auto-Debit & Reminders feature ensures seamless and timely rent payments by allowing tenants to set up automatic deductions from their preferred payment methods, such as bank accounts, credit/debit cards, or UPI wallets. This eliminates the hassle of manually transferring rent each month and reduces the risk of late payments. In addition to auto-debit functionality, the system sends automated reminders before the due date, ensuring tenants are aware of upcoming payments. If a payment is missed, the platform calculates late fees based on the rental agreement’s terms and notifies both parties, preventing disputes over delayed payments. This feature enhances financial discipline for tenants while ensuring landlords receive timely payments, making the rental experience smoother and more reliable for both parties." img="https://img.freepik.com/free-vector/real-estate-agent-offering-house-young-family-couple-wife-husband-choosing-new-suburb-home-living_575670-754.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <ProblemCard title = "Instant Rent Loans for Tenants" desc="The Instant Rent Loans for Tenants feature provides financial flexibility by partnering with fintech lenders to offer short-term rent financing solutions. This allows tenants to secure quick loans to cover rent payments, security deposits, or unexpected financial shortfalls, reducing the risk of eviction due to temporary cash flow issues. The platform integrates with lending partners to offer fast approval processes based on the tenant’s credit history and repayment ability, ensuring accessibility to those in need. Additionally, it provides customized repayment plans with minimal interest rates, enabling tenants to manage their rental expenses without financial strain. This feature not only benefits tenants by preventing rental defaults but also assures landlords of on-time payments, creating a more secure and reliable rental ecosystem." img="https://img.freepik.com/free-vector/realtor-assistance-illustration_23-2148675389.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"/>
        <Footer/>


    </div>
  )
}

export default Dashboard
