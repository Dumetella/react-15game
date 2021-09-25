import React from 'react';
import './logo.css';

export default function Logo(): JSX.Element {
    return (
        <div>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="hexagon-1"><path d="m65 148.5c16.635 2.2077 33.27 4.4154 49.904 6.623 10.949-13.445 21.897-26.889 32.846-40.334v-50.537h-82.75v84.248z" /></clipPath>
                    <clipPath id="hexagon-2"><path d="m65 234.66c23.002-9.2552 46.004-18.51 69.006-27.766-6.6-15.97-13.2-31.95-19.79-47.93-16.409-2.15-32.814-4.29-49.22-6.43v82.137z" /></clipPath>
                    <clipPath id="hexagon-3"><path d="m117.93 157.59 19.939 47.975 9.8789-3.8801v-80.684z" /></clipPath>
                    <clipPath id="hexagon-4"><path d="m73.498 235.75h74.127v-29.309c-24.709 9.7695-49.418 19.539-74.127 29.309z" /></clipPath>
                    <clipPath id="hexagon-5"><path d="m151.62 93.449c25-9.733 49.99-19.466 74.98-29.199h-74.979v29.199z" /></clipPath>
                    <clipPath id="hexagon-6"><path d="m167.08 91.613c6.4095 16.148 12.819 32.297 19.229 48.445 16.231 2.3359 32.462 4.6719 48.693 7.0078v-81.818c-22.641 8.7884-45.281 17.577-67.922 26.365z" /></clipPath>
                    <clipPath id="hexagon-7"><path d="m151.62 184.85v50.902h83.375v-84.766c-16.434-2.3646-32.868-4.7292-49.303-7.0938-11.357 13.652-22.715 27.305-34.072 40.957z" /></clipPath>
                    <clipPath id="hexagon-8"><path d="m151.75 97.617v80.51c10.275-12.249 20.549-24.499 30.824-36.748l-19.199-48.293-11.625 4.5312z" /></clipPath>
                </defs>
            </svg>
            <div className="logo">
                <div className="clip-container clip-hexagon">
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                    <div className="clip"></div>
                </div>
            </div>
        </div >
    );
}
