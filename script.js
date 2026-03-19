document.addEventListener("DOMContentLoaded", function() {
            const totalElements = document.querySelectorAll('.calculate-total-duration');

            totalElements.forEach(elem => {
                const periodsString = elem.getAttribute('data-periods');
                const periods = periodsString.split(',').map(p => p.trim());
                let totalMilliseconds = 0;

            periods.forEach(period => {
                const [startStr, endStr] = period.split('/');
                const startDate = new Date(startStr);
                const endDate = (endStr === 'today' || !endStr) ? new Date() : new Date(endStr);
            
                if (!isNaN(startDate) && !isNaN(endDate)) {
                    totalMilliseconds += (endDate - startDate);
                }
            });

            // Cálculos aproximados para la conversión
            const msInDay = 24 * 60 * 60 * 1000;
            const msInMonth = 30.44 * msInDay; 
            const msInYear = 365.25 * msInDay;

            let remaining = totalMilliseconds;

            const years = Math.floor(remaining / msInYear);
            remaining %= msInYear;

            const months = Math.floor(remaining / msInMonth);
            remaining %= msInMonth;

            const days = Math.floor(remaining / msInDay);

            // Construir el texto
            let parts = [];
            if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
            if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
            if (days > 0) parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);

            elem.textContent = parts.length > 0 ? parts.join(', ') : '0 días';
        });
    });