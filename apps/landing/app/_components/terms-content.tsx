import React from 'react';

const TermsOfService: React.FC = () => {

    return (
        <div className="flex justify-center items-center bg-white p-4">
            <div className="max-w-6xl bg-white p-6 rounded-lg">
                <h1 className="text-xl font-semibold text-center mb-4">Terms of Service</h1>
                <p className="text-sm text-gray-600 mb-4">Last updated: December 27, 2024</p>

                <div className="mb-6">
                    <p className="mb-4">Subject to these Terms of Service (this "Agreement"), Infloq ("Infloq", "we", "us", and/or "our") provides access to Infloq's AI-powered influencer marketing platform (collectively, the "Services"). By using or accessing the Services, you acknowledge that you have read, understand, and agree to be bound by this Agreement.</p>

                    <p className="mb-4">If you are entering into this Agreement on behalf of a company, business, or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the term "you" shall refer to such entity. If you do not have such authority, or if you do not agree with this Agreement, you must not accept this Agreement and may not use the Services.</p>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">1. Platform Services</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">1.1 Service Description</h3>
                    <p className="mb-2">Infloq provides an AI-powered influencer marketing platform that connects brands with creators through:</p>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">AI-driven matchmaking between brands and creators</li>
                        <li className="mb-2">Campaign management and analytics tools</li>
                        <li className="mb-2">Performance tracking and ROI measurement</li>
                        <li className="mb-2">Secure payment processing and escrow services</li>
                    </ul>

                    <h3 className="font-medium mb-2">1.2 Service Access</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Access is provided through infloq.com and associated domains</li>
                        <li className="mb-2">Requires creation and maintenance of an account</li>
                        <li className="mb-2">Subject to continued compliance with these terms</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">2. User Obligations</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">2.1 Account Requirements</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Provide accurate and complete registration information</li>
                        <li className="mb-2">Maintain the security of account credentials</li>
                        <li className="mb-2">Promptly update any changes to account information</li>
                        <li className="mb-2">Accept responsibility for all activities under your account</li>
                    </ul>

                    <h3 className="font-medium mb-2">2.2 Acceptable Use</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Use services in compliance with all applicable laws</li>
                        <li className="mb-2">Maintain professional conduct in all platform interactions</li>
                        <li className="mb-2">Respect intellectual property rights of others</li>
                        <li className="mb-2">Provide accurate campaign and performance data</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">3. Payment Terms</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">3.1 Brand Fee Structure</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">One-time platform access fee required for brands upon joining</li>
                        <li className="mb-2">Recurring fees based on campaign spend volume</li>
                        <li className="mb-2">Additional fees may apply for premium features or services</li>
                        <li className="mb-2">All fees are non-refundable unless otherwise stated</li>
                    </ul>

                    <h3 className="font-medium mb-2">3.2 Creator Fee Structure</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Platform commission on successful campaign payments</li>
                        <li className="mb-2">Commission rates clearly displayed before campaign acceptance</li>
                        <li className="mb-2">Transparent earnings calculation and distribution</li>
                    </ul>

                    <h3 className="font-medium mb-2">3.3 Payment Processing</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Secure payment processing through authorized providers</li>
                        <li className="mb-2">Escrow services for campaign payments to ensure security</li>
                        <li className="mb-2">Automated creator compensation distribution after campaign completion</li>
                        <li className="mb-2">Processing fees may be deducted from payments</li>
                    </ul>

                    <h3 className="font-medium mb-2">3.4 Campaign Payments</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Brands must fund campaigns before creator assignment</li>
                        <li className="mb-2">Clear payment milestones and release conditions</li>
                        <li className="mb-2">Dispute resolution process for payment issues</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">4. Data Collection and Usage</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">4.1 Current Data Practices</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Collection of basic account and transaction information</li>
                        <li className="mb-2">Storage of campaign performance metrics</li>
                        <li className="mb-2">Processing of payment and financial information</li>
                    </ul>

                    <h3 className="font-medium mb-2">4.2 Future Data Usage</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Platform reserves the right to implement data analysis features</li>
                        <li className="mb-2">Potential use of data for platform optimization and improvement</li>
                        <li className="mb-2">Possible implementation of advanced analytics and insights</li>
                        <li className="mb-2">Users will be notified of significant changes to data usage</li>
                    </ul>

                    <h3 className="font-medium mb-2">4.3 Data Protection</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Implementation of industry-standard security measures</li>
                        <li className="mb-2">Commitment to data privacy and protection</li>
                        <li className="mb-2">Regular security audits and updates</li>
                    </ul>
                </div>

                {/* Content and IP section updated */}
                <h2 className="text-lg font-semibold mb-2 mt-6">5. Content and Intellectual Property</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">5.1 Creator Content Rights</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Creators retain full ownership of their original content</li>
                        <li className="mb-2">Limited license granted for campaign purposes</li>
                        <li className="mb-2">Right to showcase campaign results and metrics</li>
                    </ul>

                    <h3 className="font-medium mb-2">5.2 Brand Rights</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Brands retain ownership of their trademarks and brand assets</li>
                        <li className="mb-2">Clear usage rights for campaign duration</li>
                        <li className="mb-2">Content approval rights for brand compliance</li>
                    </ul>

                    <h3 className="font-medium mb-2">5.3 Platform Rights</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Right to showcase successful campaigns</li>
                        <li className="mb-2">Usage of anonymized performance data</li>
                        <li className="mb-2">Marketing and promotional rights with user consent</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">6. AI and Automated Systems</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">6.1 AI Usage</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">AI systems used for matchmaking and recommendations</li>
                        <li className="mb-2">Automated performance tracking and analysis</li>
                        <li className="mb-2">Machine learning for platform optimization</li>
                    </ul>

                    <h3 className="font-medium mb-2">6.2 Data Processing</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Automated data collection and analysis</li>
                        <li className="mb-2">Algorithm-based decision making</li>
                        <li className="mb-2">Performance prediction and optimization</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">7. Termination</h2>
                <div className="mb-4">
                    <ul className="list-disc pl-6 mb-4">
                        <li className="mb-2">Right to terminate for violations of terms</li>
                        <li className="mb-2">Account suspension for suspicious activity</li>
                        <li className="mb-2">Data handling post-termination</li>
                    </ul>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">8. Disclaimers and Limitations</h2>
                <div className="mb-4">
                    <p className="mb-4 uppercase">THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE.</p>

                    <p className="mb-4 uppercase">IN NO EVENT WILL WE, OUR AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.</p>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">9. Dispute Resolution</h2>
                <div className="mb-4">
                    <h3 className="font-medium mb-2">9.1 Governing Law</h3>
                    <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

                    <h3 className="font-medium mb-2">9.2 Jurisdiction</h3>
                    <p className="mb-4">Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, India.</p>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">10. Changes to Terms</h2>
                <div className="mb-4">
                    <p className="mb-4">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Continued use of the platform constitutes acceptance of modified terms.</p>
                </div>

                <h2 className="text-lg font-semibold mb-2 mt-6">11. Contact Information</h2>
                <div className="mb-4">
                    <p>For questions about these Terms, contact us at:</p>
                    <div className="pl-6 mt-2">
                        <p>Legal Team</p>
                        <p>Infloq</p>
                        <p>Email: legal@infloq.com</p>
                        <p>Address: Mumbai, India - 410210</p>
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    <p className="mb-2">By using Infloq, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them.</p>
                    <p>Last updated: December 27, 2024</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;