import { ImageResponse } from 'next/og';

export const alt = 'Rushik Sutariya — Frontend Developer';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#030712',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            right: '-160px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Top accent dot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#059669',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#059669',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Open to Opportunities
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-3px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ color: '#f1f5f9' }}>Rushik Sutariya</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: 600,
              color: '#94a3b8',
              letterSpacing: '-0.5px',
            }}
          >
            Senior Frontend Developer
          </span>
          <span style={{ color: '#475569', fontSize: '24px' }}>—</span>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            React · Next.js · TypeScript
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
            borderRadius: '2px',
            marginBottom: '36px',
          }}
        />

        {/* Bottom info row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '18px', color: '#64748b' }}>📍</span>
            <span
              style={{
                fontSize: '18px',
                color: '#94a3b8',
                fontWeight: 500,
              }}
            >
              Ahmedabad, India
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '18px', color: '#64748b' }}>🏢</span>
            <span
              style={{
                fontSize: '18px',
                color: '#94a3b8',
                fontWeight: 500,
              }}
            >
              Vivansh Infotech Pvt Ltd
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '18px', color: '#64748b' }}>⚡</span>
            <span
              style={{
                fontSize: '18px',
                color: '#94a3b8',
                fontWeight: 500,
              }}
            >
              3+ Years Experience
            </span>
          </div>
        </div>

        {/* RS monogram — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          RS
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
