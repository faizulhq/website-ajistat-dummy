import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cms.models import CompanyConfig, TeamMember, HeroBanner, ToolLogo

def seed():
    print("Seeding Company Config...")
    CompanyConfig.objects.get_or_create(
        id=1,
        defaults={
            'whatsapp': '6282319341735',
            'whatsapp_display': '+62 823-1934-1735',
            'email': 'info@aji-institute.id',
            'instagram': '@ajiinstitute.id',
            'address': 'Kompleks Bandung Indah Raya Blok C7 No.1, Kel. Mekarjaya, Kec. Rancasari, Bandung',
            'operational_hours': '24 Jam / 7 Hari'
        }
    )

    print("Seeding Teams...")
    if not TeamMember.objects.exists():
        TeamMember.objects.create(
            name='Aji Pamoso, S.Si, M.T',
            role='Founder & CEO Aji Institute | Lead Expert AjiStat',
            initials='AP',
            accent_color='#F0A500',
            accent_light='#FFF8E6',
            description='PhD Candidate di UniSZA Malaysia & Dosen Teknik Industri Telkom University.',
            detail='Aji Pamoso adalah CEO Aji Institute sekaligus Tim Ekspert AjiStat. Beliau saat ini merupakan PhD Candidate di Department of Social and Behavioural Science, Faculty of Applied Social Sciences (FSSG), Universiti Sultan Zainal Abidin (UniSZA), Terengganu, Malaysia, dan juga aktif mengajar sebagai Dosen di Department of Industrial Engineering, Faculty of Industrial Engineering, Telkom University, Bandung.',
            tags='CEO,Ekspert AjiStat,Statistika,Riset Akademik',
            is_ceo=True,
            order=1
        )
        TeamMember.objects.create(
            name='Tim Fasilitator AjiStat',
            role='Konsultan Statistik & Peneliti',
            initials='ST',
            accent_color='#1B3A8C',
            accent_light='#EEF2FF',
            description='Bekerja di bawah supervisi langsung dari Lead Expert Aji Pamoso untuk analisis data riset akademik dan industri.',
            detail='Tim AjiStat terdiri dari para konsultan statistik dan peneliti berpengalaman yang bekerja secara langsung di bawah supervisi ketat Lead Expert Aji Pamoso. Kami telah mendampingi lebih dari 5.000 mahasiswa, akademisi, dan peneliti di seluruh Indonesia. Spesialisasi kami mencakup analisis data kuantitatif, uji validitas & reliabilitas, analisis regresi, SEM-PLS, hingga penulisan laporan ilmiah yang terstandar.',
            tags='SPSS,SmartPLS,R Studio,Python,AMOS,Metodologi Riset',
            order=2
        )
        TeamMember.objects.create(
            name='Tim Fasilitator AjiBiz',
            role='Business & Management Trainer',
            initials='BZ',
            accent_color='#1B3A8C',
            accent_light='#EEF2FF',
            description='Praktisi bisnis dan manajemen dengan latar belakang MBA dan pengalaman korporat lebih dari 10 tahun.',
            detail='Tim AjiBiz menghadirkan pelatihan bisnis dan manajemen yang berorientasi pada praktik nyata. Diperkuat oleh praktisi korporat dan konsultan bisnis berpengalaman, kami menyentuh topik dari perencanaan strategis, pengembangan SDM, analisis keuangan, hingga transformasi digital organisasi.',
            tags='Business Strategy,Manajemen SDM,Financial Planning,Leadership,MBA',
            order=3
        )
        TeamMember.objects.create(
            name='Tim Fasilitator AjiComm',
            role='PR & Communication Expert',
            initials='PR',
            accent_color='#1B3A8C',
            accent_light='#EEF2FF',
            description='Trainer komunikasi publik, media relation, dan personal branding bersertifikat dengan jam terbang tinggi.',
            detail='Tim AjiComm adalah para ahli komunikasi yang berpengalaman di bidang public relations, jurnalistik, dan media. Kami membantu individu dan organisasi membangun citra profesional, mengelola hubungan media, serta menguasai komunikasi krisis dan personal branding di era digital.',
            tags='Public Speaking,Media Relations,Personal Branding,Crisis Comm.,LinkedIn',
            order=4
        )
        TeamMember.objects.create(
            name='Tim Fasilitator AjiAI',
            role='Digital Marketing & Developer',
            initials='DG',
            accent_color='#1B3A8C',
            accent_light='#EEF2FF',
            description='Expert praktisi industri dalam pengembangan strategi digital, konten kreatif, dan teknologi komputasi modern.',
            detail='Tim AjiAI adalah gabungan praktisi pemasaran digital dan pengembang teknologi yang aktif di industri. Dari strategi media sosial, SEO, iklan berbayar, hingga pengembangan aplikasi — kami mengajarkan apa yang benar-benar dibutuhkan dunia kerja digital saat ini.',
            tags='Digital Marketing,SEO/SEM,Content Strategy,Web Dev,Data Analytics',
            order=5
        )
        TeamMember.objects.create(
            name='Tim Fasilitator AjiLingua',
            role='English & Academic Instructor',
            initials='LG',
            accent_color='#1B3A8C',
            accent_light='#EEF2FF',
            description='Pengajar bahasa Inggris setingkat ahli dengan spesialisasi persiapan tes akademik dan komunikasi bisnis global.',
            detail='Tim AjiLingua mengkhususkan diri dalam pengajaran bahasa Inggris untuk keperluan akademik dan profesional. Dengan pendekatan komunikatif dan kontekstual, kami membantu peserta meningkatkan kemampuan berbicara, menulis akademis, serta mempersiapkan diri untuk ujian IELTS, TOEFL, dan seleksi beasiswa internasional.',
            tags='IELTS/TOEFL,Academic Writing,Business English,Conversation,Grammar',
            order=6
        )

    print("Seed Complete!")

if __name__ == '__main__':
    seed()
