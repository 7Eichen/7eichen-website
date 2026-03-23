export function SiebnenflagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-1 -1 129 154"
      overflow="visible"
      className={className}
      aria-label="Wappen Siebnen"
      role="img"
    >
      <defs>
        <radialGradient
          xlinkHref="#sflag-a"
          id="sflag-f"
          cx="70.484" cy="69.663" r="32.493" fx="70.484" fy="69.663"
          gradientTransform="matrix(1 0 0 1.9861 0 -71.674)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#sflag-b"
          id="sflag-e"
          cx="71.5" cy="44.536" r="62.75" fx="71.5" fy="44.536"
          gradientTransform="matrix(1 0 0 .38645 0 44.789)"
          gradientUnits="userSpaceOnUse"
        />
        <radialGradient
          xlinkHref="#sflag-c"
          id="sflag-d"
          cx="78.5" cy="59.333" r="62.5" fx="78.5" fy="59.333"
          gradientTransform="matrix(1 0 0 1.2 0 -15.2)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient id="sflag-c">
          <stop offset="0" stopColor="red" />
          <stop offset="1" stopColor="#df0000" />
        </linearGradient>
        <linearGradient id="sflag-b">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#f3f3f3" />
        </linearGradient>
        <linearGradient id="sflag-a">
          <stop offset="0" stopColor="#ffff7f" />
          <stop offset=".7" stopColor="#efef5f" />
          <stop offset="1" stopColor="#dfdf3f" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sflag-d)"
        d="M1 1v87.5C1 123.12 28.88 151 63.5 151S126 123.12 126 88.5V1H1"
      />
      <path
        fill="url(#sflag-e)"
        stroke="#000" strokeWidth=".3" strokeLinecap="round" strokeLinejoin="miter"
        d="M1 49v39.5c0 2.889.218 5.717.594 8.5h123.812a63 63 0 0 0 .594-8.5V49z"
      />
      <path
        fill="url(#sflag-f)"
        stroke="#000" strokeWidth=".3"
        d="M61.969 8.156c-.505.01-.986.035-1.438.063-1.807.11-3.466.37-4.968.781-3.006.823-5.417 2.278-7.313 4.531-4.437 5.273-7.076 13.708.656 20.75 4.634 4.22 4.037 6.61 3.063 8.157-1.924 3.054-3.955 2.14-8.844-1.094-3.573-2.365-6.595-2.84-8.437-1.719-1.843 1.12-2.503 3.825-2.657 6.625-.224 4.087 1.11 4.564 6.657 7.375 7.975 4.042 11.406 7.654 11.406 12.031 0 4.59-2.38 5.472-8 2.938-5.408-2.439-8.631-1.611-10.438 2.75-2.123 5.125.8 9.556 9.313 14.094 7.882 4.2 10.433 7.225 10.687 12.78.17 3.707-.205 4.562-4.343 2.97-6.927-2.665-7.512.833-7.032 3.156.639 3.091 3.738 4.38 9.125 9.156 4.343 3.85 8.265 8.768 10.344 10.813.913.897 3.046 3.441 3.048 5.937l.004 6.938s.191.026.667.03h.062c.476-.004.667-.03.667-.03l-.027-6.907c-.01-2.495 2.072-5.14 3.048-5.969 2.012-1.71 6-6.962 10.344-10.812 5.387-4.776 8.486-6.065 9.124-9.156.48-2.323-.105-5.821-7.03-3.156-4.139 1.592-4.514.769-4.344-2.938.254-5.556 2.805-8.611 10.687-12.812 8.512-4.538 11.435-8.97 9.313-14.094-1.807-4.361-4.999-5.189-10.407-2.75-5.62 2.534-8.031 1.652-8.031-2.938 0-4.377 3.43-7.99 11.406-12.031 5.547-2.81 6.912-3.257 6.688-7.344-.154-2.8-.845-5.535-2.688-6.656-1.842-1.12-4.833-.646-8.406 1.719-4.889 3.235-6.92 4.148-8.844 1.093-.974-1.547-1.602-3.936 3.031-8.156 7.733-7.042 5.094-15.477.657-20.75-1.896-2.253-4.307-3.708-7.313-4.531-1.503-.411-3.13-.671-4.937-.781a42 42 0 0 0-2.969-.063 47 47 0 0 0-1.531 0zm.798 129.01.733-90.1m.7 90.1-.097-14.838-.424-64.658-.179-10.603"
      />
      <path
        fill="none"
        stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"
        d="M1 1v87.5C1 123.12 28.88 151 63.5 151S126 123.12 126 88.5V1H1z"
      />
    </svg>
  )
}
